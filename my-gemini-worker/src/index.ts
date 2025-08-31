/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// File: my-gemini-worker/src/index.ts

import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse, Part } from "@google/genai";
import { jwtVerify, createRemoteJWKSet } from 'jose';

export interface Env {
    // Biến môi trường bí mật, chúng ta sẽ cấu hình sau trên Cloudflare
    GOOGLE_CLIENT_ID: string;
}

// Hàm xử lý CORS để cho phép trang web của bạn gọi đến Worker
function handleCorsHeaders(request: Request, headers: Headers): Headers {
    const origin = request.headers.get('Origin') || "*";
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Thêm Authorization
    return headers;
}

// Hàm xác thực Token JWT của Google
async function verifyGoogleToken(token: string, clientId: string): Promise<boolean> {
    try {
        const JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
        const { payload } = await jwtVerify(token, JWKS, {
            issuer: ['https://accounts.google.com', 'accounts.google.com'],
            audience: clientId,
        });
        // Nếu không có lỗi, token hợp lệ
        console.log("Token payload:", payload);
        return true;
    } catch (error) {
        console.error("Token verification failed:", error);
        return false;
    }
}


export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        let headers = new Headers();
        handleCorsHeaders(request, headers);

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers });
        }

        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405, headers });
        }

        // --- BƯỚC XÁC THỰC GOOGLE TOKEN ---
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response('Authorization token is required.', { status: 401, headers });
        }
        const googleToken = authHeader.split(' ')[1];
        const isTokenValid = await verifyGoogleToken(googleToken, env.GOOGLE_CLIENT_ID);
        if (!isTokenValid) {
            return new Response('Invalid Google token.', { status: 401, headers });
        }
        // --- KẾT THÚC XÁC THỰC ---

        try {
            const {
                imageDataUrl,
                country,
                backgroundColor,
                outfit,
                specs,
                customOutfitImageUrl,
                apiKey, // API key của người dùng
            } = await request.json() as any;

            if (!apiKey) {
                return new Response('User API key is required.', { status: 400, headers });
            }

            // Logic gọi Gemini API (đã sao chép từ file của bạn)
            const ai = new GoogleGenAI({ apiKey });
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

            const resultUrl = processGeminiResponse(result);

            headers.set('Content-Type', 'application/json');
            return new Response(JSON.stringify({ imageUrl: resultUrl }), { status: 200, headers });

        } catch (error: any) {
            console.error("Error in Gemini Call:", error);
            return new Response(`Failed to generate image: ${error.message}`, { status: 500, headers });
        }
    },
};

/*
* CÁC HÀM HỖ TRỢ (SAO CHÉP TỪ FILE GỐC CỦA BẠN)
*/
function getOutfitInstruction(outfit: string, hasCustomOutfit?: boolean): string {
    if (outfit === 'custom' && hasCustomOutfit) {
        return "Critically important: Change the clothing to match the style, color, and type of clothing shown in the second reference image provided. The person should appear to be wearing the outfit from the reference image, fitted realistically to their body.";
    }
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
        case 'keep': default: return "Keep the original clothing from the photo, but ensure it looks neat and professional. If the clothing is distracting or informal, replace it with a simple, plain-colored crew neck shirt.";
    }
}

function getPromptForIdPhoto(country: string, backgroundColor: string, outfit: string, specs?: string, hasCustomOutfit?: boolean): string {
    const outfitInstruction = getOutfitInstruction(outfit, hasCustomOutfit);
    const dimensionInstruction = specs
        ? `Dimension & Cropping Requirements:\nThis is a strict requirement. The final image MUST adhere to these dimensions precisely.\n${specs}`
        : "Cropping: The final image must be clean, professional, and cropped appropriately for a passport-style photo.";
    return `Critically important: Edit the uploaded photo to create a professional, hyper-realistic passport/visa photograph suitable for an official document for ${country}.

Key requirements for the person's appearance:
1.  **Likeness Preservation:** The person's face, facial features (eyes, nose, mouth), hair, and head shape MUST be preserved with 100% accuracy from the original photo. Do not alter their likeness in any way.
2.  **Skin Texture:** The final image must retain a natural skin texture. Include subtle, realistic skin grains and pores. Avoid any overly smooth, "airbrushed", or artificial-looking skin. The result should look like a high-quality photograph, not a digital painting.
3.  **Expression:** The person's expression should be neutral, with both eyes open, mouth closed, and looking directly at the camera.

${dimensionInstruction}

General photo requirements:
-   **Resolution & Quality:** The final image must be a high-resolution, high-quality, clear head-and-shoulders portrait.
-   **Lighting:** The lighting must be uniform and balanced, with no shadows on the face or in the background.
-   **Background:** The background must be a solid, plain ${backgroundColor}.
-   **Clothing:** ${outfitInstruction}
-   **Accessories:** Remove any non-religious headwear (like hats or beanies), headphones, or sunglasses. If the person wears prescription glasses in the original photo, ensure there is no glare on the lenses.
-   **No Text:** Do not generate any text, letters, or numbers in the image.`;
}

function processGeminiResponse(response: GenerateContentResponse): string {
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        return `data:${mimeType};base64,${data}`;
    }
    const textResponse = response.text;
    console.error("API did not return an image. Response:", textResponse);
    throw new Error(`The AI model responded with text instead of an image. Please try adjusting your options or using a different photo.`);
}