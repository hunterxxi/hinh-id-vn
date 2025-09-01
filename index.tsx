// File: my-gemini-worker/src/index.ts - PHIÊN BẢN HOÀN CHỈNH CUỐI CÙNG

import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse, Part } from "@google/genai";
import { jwtVerify, createRemoteJWKSet } from 'jose';

export interface Env {
    GOOGLE_CLIENT_ID: string;
}

const corsHeaders = (origin: string | null) => ({
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});

async function verifyGoogleToken(token: string, clientId: string): Promise<boolean> {
    try {
        const JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
        const { payload } = await jwtVerify(token, JWKS, {
            issuer: ['https://accounts.google.com', 'accounts.google.com'],
            audience: clientId,
        });
        return !!payload;
    } catch (error) {
        console.error("Token verification failed:", error);
        return false;
    }
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const origin = request.headers.get('Origin');
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders(origin) });
        }

        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405, headers: corsHeaders(origin) });
        }

        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response('Authorization token is required.', { status: 401, headers: corsHeaders(origin) });
        }
        const googleToken = authHeader.split(' ')[1];
        const isTokenValid = await verifyGoogleToken(googleToken, env.GOOGLE_CLIENT_ID);
        if (!isTokenValid) {
            return new Response('Invalid Google token.', { status: 401, headers: corsHeaders(origin) });
        }

        try {
            const { action, payload } = await request.json() as any;

            if (!payload || !payload.apiKey) {
                 return new Response('User API key is required.', { status: 400, headers: corsHeaders(origin) });
            }
            
            const ai = new GoogleGenAI({ apiKey: payload.apiKey });
            let resultData;

            switch (action) {
                case 'generate':
                    resultData = await handleGenerate(ai, payload);
                    break;
                case 'analyze':
                    resultData = await handleAnalyze(ai, payload);
                    break;
                case 'facebox':
                    resultData = await handleFacebox(ai, payload);
                    break;
                default:
                    return new Response('Invalid action specified.', { status: 400, headers: corsHeaders(origin) });
            }
            
            return new Response(JSON.stringify(resultData), { 
                status: 200, 
                headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } 
            });

        } catch (error: any) {
            console.error("Error processing request:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            return new Response(`Failed to process request: ${errorMessage}`, { status: 500, headers: corsHeaders(origin) });
        }
    },
};

// CÁC HÀM XỬ LÝ CHO TỪNG HÀNH ĐỘNG
async function handleGenerate(ai: GoogleGenAI, payload: any) {
    const { imageDataUrl, country, backgroundColor, outfit, specs, customOutfitImageUrl } = payload;
    const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) throw new Error("Invalid image data URL format.");
    const [, mimeType, base64Data] = match;

    const imagePart: Part = { inlineData: { mimeType, data: base64Data } };
    const parts: Part[] = [imagePart];

    if (outfit === 'custom' && customOutfitImageUrl) {
        const outfitMatch = customOutfitImageUrl.match(/^data:(image\/\w+);base64,(.*)$/);
        if (outfitMatch) {
            const [, outfitMimeType, outfitBase64Data] = outfitMatch;
            parts.push({ inlineData: { mimeType: outfitMimeType, data: outfitBase64Data } });
        }
    }

    const prompt = getPromptForIdPhoto(country, backgroundColor, outfit, specs, !!customOutfitImageUrl);
    parts.push({ text: prompt });

    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts },
        config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
    });
    
    return { imageUrl: processGeminiResponse(result) };
}

async function handleAnalyze(ai: GoogleGenAI, payload: any) {
    const { imageDataUrl } = payload;
    const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) throw new Error("Invalid image data URL format for quality analysis.");
    const [, mimeType, base64Data] = match;

    const imagePart: Part = { inlineData: { mimeType, data: base64Data } };
    const prompt = `Analyze the provided photo for its suitability as a source for a passport photo. Evaluate the following criteria and return ONLY a single JSON object with your findings. Do not add any commentary.
- isBlurry: boolean (true if the image is out of focus, blurry, or has significant motion blur)
- lightingQuality: "good" or "poor" (poor if there are harsh shadows on the face, or if it's significantly over or under-exposed)
- expression: "neutral", "smiling", or "other" (check if the mouth is closed and the expression is neutral)
- isObstructed: boolean (true if hair, hands, or any object is covering a significant part of the face)
- headTilt: "straight" or "tilted" (true if the head is noticeably tilted to one side)`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: prompt }] },
    });
    const rawText = response.text.trim();
    const jsonString = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    if (!jsonString) throw new Error("AI quality analysis returned an empty response.");
    return JSON.parse(jsonString);
}

async function handleFacebox(ai: GoogleGenAI, payload: any) {
    const { imageDataUrl } = payload;
    const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) throw new Error("Invalid image data URL format for face detection.");
    const [, mimeType, base64Data] = match;

    const imagePart: Part = { inlineData: { mimeType, data: base64Data } };
    const prompt = `**TASK:** You are an automated photo pre-processing agent. Your goal is to find the single most prominent human face in the image to prepare it for an ID photo.
**CRITERIA FOR THE PRIMARY FACE:**
1.  **Largest on screen:** The face that occupies the most area.
2.  **Most Centered:** The face closest to the center of the image.
3.  **Front-Facing:** Prioritize faces looking directly at the camera.
**INSTRUCTIONS:**
* Analyze the provided image and identify the bounding box of the primary human face based on the criteria above.
* **OUTPUT FORMAT (STRICT):** Return ONLY a valid JSON object with normalized coordinates (from 0.0 to 1.0) for the bounding box. The format MUST be: {"x_min": float, "y_min": float, "x_max": float, "y_max": float}.
* **FAILURE CONDITION:** If no face is detected, return a plain text error message.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: prompt }] },
    });
    const rawText = response.text.trim();
    const jsonString = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    if (!jsonString) throw new Error("AI failed to detect a face.");
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        throw new Error(`AI returned invalid face data: ${jsonString}`);
    }
}

// CÁC HÀM HỖ TRỢ
function processGeminiResponse(response: GenerateContentResponse): string {
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        return `data:${mimeType};base64,${data}`;
    }
    throw new Error(`The AI model responded with text instead of an image.`);
}

function getOutfitInstruction(outfit: string, hasCustomOutfit?: boolean): string {
    if (outfit === 'custom' && hasCustomOutfit) return "Critically important: Change the clothing to match the style, color, and type of clothing shown in the second reference image provided. The person should appear to be wearing the outfit from the reference image, fitted realistically to their body.";
    switch (outfit) {
        case 'suit_male': return "Change the clothing to a professional men's business suit (dark grey or navy blue) with a white collared shirt and a simple tie.";
        case 'suit_female': return "Change the clothing to a professional women's business blouse and suit jacket (dark grey or navy blue).";
        case 'ao_dai_female': return "Change the clothing to a traditional Vietnamese Ao Dai, in an elegant, solid color like white or light blue.";
        case 'biz_cas_male': return "Change the clothing to a men's business casual shirt, such as a collared polo or button-down shirt in a solid, neutral color.";
        case 'biz_cas_female': return "Change the clothing to a women's business casual blouse in a solid, professional color.";
        case 'sari_female': return "Change the clothing to a simple and elegant traditional Indian Sari suitable for an official document.";
        case 'kimono_female': return "Change the clothing to a simple and elegant traditional Japanese Kimono suitable for an official document.";
        case 'shirt_male': return "Change the clothing to a simple, plain white collared shirt for men.";
        case 'shirt_female': return "Change the clothing to a simple, plain white collared shirt or blouse for women.";
        case 'pilot': return "Change the clothing to a professional pilot's uniform: a white collared shirt, a black tie, and a dark blazer with pilot epaulets on the shoulders.";
        case 'flight_attendant': return "Change the clothing to a professional flight attendant's uniform, typically a smart blouse and a neck scarf or a blazer in a conservative color like navy blue or grey.";
        case 'doctor': return "Change the clothing to a professional doctor's attire, such as a white lab coat over a collared shirt or scrubs. A stethoscope around the neck is optional but appropriate.";
        case 'engineer': case 'architect': return "Change the clothing to a professional engineer's or architect's attire, such as a smart button-down collared shirt. Avoid anything too casual.";
        case 'teacher': return "Change the clothing to be appropriate for a teacher: a modest collared shirt, blouse, or a smart sweater. The look should be professional and friendly.";
        default: return "Keep the original clothing from the photo, but ensure it looks neat and professional.";
    }
}

function getPromptForIdPhoto(country: string, backgroundColor: string, outfit: string, specs?: string, hasCustomOutfit?: boolean): string {
    const outfitInstruction = getOutfitInstruction(outfit, hasCustomOutfit);
    const dimensionInstruction = specs ? `Dimension & Cropping Requirements:\nThis is a strict requirement. The final image MUST adhere to these dimensions precisely.\n${specs}` : "Cropping: The final image must be clean, professional, and cropped appropriately for a passport-style photo.";
    return `**Primary Objective:** Transform the provided image into a hyper-realistic, compliant passport or visa photograph for ${country}. The final output must look like a high-quality photograph taken in a professional studio, NOT a digital illustration or an airbrushed image.\n\n**Mandatory Directives for Subject's Appearance:**\n\n1.  **Likeness Preservation (Non-negotiable):** The subject's core facial structure, features (eyes, nose, mouth), and head shape must remain 100% identical to the source photo. Do not alter their fundamental identity.\n\n2.  **Photorealistic Skin Texture (Crucial):** Retain and enhance natural skin texture. This includes visible pores, fine lines, and subtle skin grain. Absolutely NO beautification, smoothing, or "airbrushing" effects. The final skin texture must not look waxy, plastic, or overly smooth.\n\n3.  **Expression:** The person's expression must be neutral: eyes open, looking directly at the camera, and mouth closed.\n\n4.  **Gaze Correction:** If the person's gaze is slightly off-center, subtly adjust it so they are looking directly forward into the camera.\n\n${dimensionInstruction}\n\n**Studio Environment Simulation:**\n-   **Studio-Quality Lighting:** The lighting must be completely uniform and balanced. Eliminate all shadows on the face and background. Crucially, remove any harsh glare or hotspots on the skin.\n-   **Background Integration:** The background must be a solid, perfectly uniform, plain ${backgroundColor}.\n-   **Clothing Integration:** ${outfitInstruction} The new clothing must be rendered with photorealistic texture and must integrate seamlessly.\n-   **Accessories:** Remove any non-religious headwear, headphones, or sunglasses. Ensure there is no glare on prescription lenses.\n-   **No Text:** Do not generate any text, letters, or numbers in the image.`;
}