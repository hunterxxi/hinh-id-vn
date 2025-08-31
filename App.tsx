// File: ai-id-photo-generator-application/App.tsx

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateIdPhoto } from './services/geminiService';
import Lightbox from './components/Lightbox';
import LanguageSwitcher from './components/LanguageSwitcher';
import { translations, languageConfig } from './translations';
import GuideModal from './components/GuideModal';
import PrintConfirmationModal from './components/PrintConfirmationModal';
import InfoModal from './components/InfoModal';
import Footer from './components/Footer';

// !!! QUAN TRỌNG: URL NÀY SẼ ĐƯỢC CẬP NHẬT SAU KHI DEPLOY WORKER
const CLOUD_WORKER_URL = "https://my-gemini-worker.phanmanhkhang89.workers.dev";
// !!! QUAN TRỌNG: DÁN GOOGLE CLIENT ID BẠN ĐÃ LẤY Ở PHẦN 3 VÀO ĐÂY
const GOOGLE_CLIENT_ID = "378337637003-15iq90i9fm7tblo6rvjuqagiu66u0ua9.apps.googleusercontent.com";

// (Toàn bộ phần code hằng số COUNTRIES, COUNTRY_CODES, BACKGROUND_COLORS, OUTFITS, countryPhotoSpecs... giữ nguyên như file gốc của bạn)
// --- BẠN HÃY SAO CHÉP TOÀN BỘ PHẦN ĐÓ TỪ FILE GỐC VÀ DÁN VÀO ĐÂY ---
const COUNTRIES = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
    'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast',
    'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
    'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua new Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar',
    'Romania', 'Russia', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Schengen Area', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'USA', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen',
    'Zambia', 'Zimbabwe'
].sort();

const COUNTRY_CODES: Record<string, string> = {
    'Afghanistan': 'af', 'Albania': 'al', 'Algeria': 'dz', 'Andorra': 'ad', 'Angola': 'ao', 'Argentina': 'ar', 'Armenia': 'am', 'Australia': 'au', 'Austria': 'at', 'Azerbaijan': 'az',
    'Bahamas': 'bs', 'Bahrain': 'bh', 'Bangladesh': 'bd', 'Barbados': 'bb', 'Belarus': 'by', 'Belgium': 'be', 'Belize': 'bz', 'Benin': 'bj', 'Bhutan': 'bt', 'Bolivia': 'bo', 'Bosnia and Herzegovina': 'ba', 'Botswana': 'bw', 'Brazil': 'br', 'Brunei': 'bn', 'Bulgaria': 'bg', 'Burkina Faso': 'bf', 'Burundi': 'bi',
    'Cambodia': 'kh', 'Cameroon': 'cm', 'Canada': 'ca', 'Cape Verde': 'cv', 'Central African Republic': 'cf', 'Chad': 'td', 'Chile': 'cl', 'China': 'cn', 'Colombia': 'co', 'Comoros': 'km', 'Congo': 'cg', 'Costa Rica': 'cr', 'Croatia': 'hr', 'Cuba': 'cu', 'Cyprus': 'cy', 'Czech Republic': 'cz',
    'Denmark': 'dk', 'Djibouti': 'dj', 'Dominica': 'dm', 'Dominican Republic': 'do',
    'Ecuador': 'ec', 'Egypt': 'eg', 'El Salvador': 'sv', 'Equatorial Guinea': 'gq', 'Eritrea': 'er', 'Estonia': 'ee', 'Eswatini': 'sz', 'Ethiopia': 'et',
    'Fiji': 'fj', 'Finland': 'fi', 'France': 'fr',
    'Gabon': 'ga', 'Gambia': 'gm', 'Georgia': 'ge', 'Germany': 'de', 'Ghana': 'gh', 'Greece': 'gr', 'Grenada': 'gd', 'Guatemala': 'gt', 'Guinea': 'gn', 'Guinea-Bissau': 'gw', 'Guyana': 'gy',
    'Haiti': 'ht', 'Honduras': 'hn', 'Hungary': 'hu',
    'Iceland': 'is', 'India': 'in', 'Indonesia': 'id', 'Iran': 'ir', 'Iraq': 'iq', 'Ireland': 'ie', 'Israel': 'il', 'Italy': 'it', 'Ivory Coast': 'ci',
    'Jamaica': 'jm', 'Japan': 'jp', 'Jordan': 'jo',
    'Kazakhstan': 'kz', 'Kenya': 'ke', 'Kiribati': 'ki', 'Kuwait': 'kw', 'Kyrgyzstan': 'kg',
    'Laos': 'la', 'Latvia': 'lv', 'Lebanon': 'lb', 'Lesotho': 'ls', 'Liberia': 'lr', 'Libya': 'ly', 'Liechtenstein': 'li', 'Lithuania': 'lt', 'Luxembourg': 'lu',
    'Madagascar': 'mg', 'Malawi': 'mw', 'Malaysia': 'my', 'Maldives': 'mv', 'Mali': 'ml', 'Malta': 'mt', 'Marshall Islands': 'mh', 'Mauritania': 'mr', 'Mauritius': 'mu', 'Mexico': 'mx', 'Micronesia': 'fm', 'Moldova': 'md', 'Monaco': 'mc', 'Mongolia': 'mn', 'Montenegro': 'me', 'Morocco': 'ma', 'Mozambique': 'mz', 'Myanmar': 'mm',
    'Namibia': 'na', 'Nauru': 'nr', 'Nepal': 'np', 'Netherlands': 'nl', 'New Zealand': 'nz', 'Nicaragua': 'ni', 'Niger': 'ne', 'Nigeria': 'ng', 'North Korea': 'kp', 'North Macedonia': 'mk', 'Norway': 'no',
    'Oman': 'om',
    'Pakistan': 'pk', 'Palau': 'pw', 'Palestine': 'ps', 'Panama': 'pa', 'Papua New Guinea': 'pg', 'Paraguay': 'py', 'Peru': 'pe', 'Philippines': 'ph', 'Poland': 'pl', 'Portugal': 'pt',
    'Qatar': 'qa',
    'Romania': 'ro', 'Russia': 'ru', 'Rwanda': 'rw',
    'Saint Kitts and Nevis': 'kn', 'Saint Lucia': 'lc', 'Saint Vincent and the Grenadines': 'vc', 'Samoa': 'ws', 'San Marino': 'sm', 'Sao Tome and Principe': 'st', 'Saudi Arabia': 'sa', 'Schengen Area': 'eu', 'Senegal': 'sn', 'Serbia': 'rs', 'Seychelles': 'sc', 'Sierra Leone': 'sl', 'Singapore': 'sg', 'Slovakia': 'sk', 'Slovenia': 'si', 'Solomon Islands': 'sb', 'Somalia': 'so', 'South Africa': 'za', 'South Korea': 'kr', 'South Sudan': 'ss', 'Spain': 'es', 'Sri Lanka': 'lk', 'Sudan': 'sd', 'Suriname': 'sr', 'Sweden': 'se', 'Switzerland': 'ch', 'Syria': 'sy',
    'Taiwan': 'tw', 'Tajikistan': 'tj', 'Tanzania': 'tz', 'Thailand': 'th', 'Timor-Leste': 'tl', 'Togo': 'tg', 'Tonga': 'to', 'Trinidad and Tobago': 'tt', 'Tunisia': 'tn', 'Turkey': 'tr', 'Turkmenistan': 'tm', 'Tuvalu': 'tv',
    'Uganda': 'ug', 'Ukraine': 'ua', 'United Arab Emirates': 'ae', 'United Kingdom': 'gb', 'USA': 'us', 'Uruguay': 'uy', 'Uzbekistan': 'uz',
    'Vanuatu': 'vu', 'Vatican City': 'va', 'Venezuela': 've', 'Vietnam': 'vn',
    'Yemen': 'ye',
    'Zambia': 'zm', 'Zimbabwe': 'zw'
};

const BACKGROUND_COLORS = {
    'white': '#FFFFFF',
    'lightGrey': '#F0F0F0',
    'blue': '#EBF4FF',
    'red': '#FFEBEE', // A light, suitable red
};

const OUTFITS = {
    'keep': 'keep',
    'suit_male': 'suit_male',
    'suit_female': 'suit_female',
    'biz_cas_male': 'biz_cas_male',
    'biz_cas_female': 'biz_cas_female',
    'shirt_male': 'shirt_male',
    'shirt_female': 'shirt_female',
    'ao_dai_female': 'ao_dai_female',
    'sari_female': 'sari_female',
    'kimono_female': 'kimono_female',
    'pilot': 'pilot',
    'flight_attendant': 'flight_attendant',
    'doctor': 'doctor',
    'engineer': 'engineer',
    'architect': 'architect',
    'teacher': 'teacher',
    'custom': 'custom',
};


// Country-specific photo dimension requirements
const schengenSpec = {
    aspectRatio: '7 / 9', // 3.5cm / 4.5cm
    requirements: `**MANDATORY TECHNICAL DIRECTIVE FOR IMAGE PROCESSOR**
**TASK:** Re-compose the source image into a valid visa photograph for the Schengen Area.
**FAILURE CONDITION:** The output image does not strictly adhere to ALL geometric rules below. These rules are the absolute priority.

**PROCEDURE:**
1.  **Set Canvas:** The final image canvas MUST have a perfect 7:9 (width:height) aspect ratio.
2.  **Isolate & Scale Head:** Identify the subject's head (from chin bottom to hair top). Re-crop and re-scale the person so this head height is **between 70% and 80%** of the total canvas height.
3.  **VERIFY:** Measure the head height in the output image. If it is not within the 70-80% range, the task has failed. Start over.
4.  **Position:** Center the verified head horizontally. Ensure a small, clear space exists between the top of the hair and the top canvas edge.`
};
const seaSpec = {
    aspectRatio: '2 / 3', // 4cm / 6cm
    requirements: `**MANDATORY TECHNICAL DIRECTIVE FOR IMAGE PROCESSOR**
**TASK:** Re-compose the source image into a valid visa photograph for Southeast Asian countries (e.g., Vietnam, Thailand).
**FAILURE CONDITION:** The output image does not strictly adhere to ALL geometric rules below. These rules are the absolute priority.

**PROCEDURE:**
1.  **Set Canvas:** The final image canvas MUST have a perfect 2:3 (width:height) aspect ratio.
2.  **Isolate & Scale Head:** Identify the subject's head (from chin bottom to hair top). Re-crop and re-scale the person so this head height is **between 70% and 80%** of the total canvas height.
3.  **VERIFY:** Measure the head height in the output image. If it is not within the 70-80% range, the task has failed. Start over.
4.  **Position:** Center the verified head horizontally. Ensure a small, clear space exists between the top of the hair and the top canvas edge.`
};
const countryPhotoSpecs: Record<string, { aspectRatio: string; requirements: string }> = {
    // Group 1: Schengen standard
    'Schengen Area': schengenSpec, 'Singapore': schengenSpec, 'South Korea': schengenSpec, 'Japan': schengenSpec, 'Germany': schengenSpec, 'France': schengenSpec, 'Italy': schengenSpec, 'Spain': schengenSpec, 'Netherlands': schengenSpec, 'Belgium': schengenSpec, 'Austria': schengenSpec, 'Greece': schengenSpec, 'Portugal': schengenSpec, 'Sweden': schengenSpec, 'Finland': schengenSpec, 'Denmark': schengenSpec, 'Norway': schengenSpec, 'Switzerland': schengenSpec, 'Poland': schengenSpec, 'Czech Republic': schengenSpec, 'Hungary': schengenSpec,
    // Group 2: USA
    'USA': {
        aspectRatio: '1 / 1',
        requirements: `You are a technical image processor executing a non-negotiable directive.
**Directive:** Generate a US visa photo.
**Failure condition:** Any deviation from the following geometric constraints.

**Constraint 1: Frame Aspect Ratio (Absolute)**
- The final image canvas MUST be a perfect 1:1 square.

**Constraint 2: Head Size (CRITICAL - MEASURE AND ENFORCE)**
- Identify the head from the bottom of the chin to the top of the hair.
- The height of this head region MUST be scaled to occupy **exactly 50% to 69%** of the total canvas height.

**Constraint 3: Eye Position (CRITICAL - MEASURE AND ENFORCE)**
- The subject's eyes MUST be located between **55% and 68%** of the image height from the bottom edge of the photo.

**Constraint 4: Positioning (Mandatory)**
- Center the head horizontally.`
    },
    // Group 3: Southeast Asia
    'Vietnam': seaSpec, 'Thailand': seaSpec, 'Indonesia': seaSpec, 'Philippines': seaSpec, 'Cambodia': seaSpec, 'Laos': seaSpec, 'Myanmar': seaSpec,
    // Group 4: Malaysia
    'Malaysia': {
        aspectRatio: '7 / 10', // 3.5cm / 5cm
        requirements: `**MANDATORY TECHNICAL DIRECTIVE FOR IMAGE PROCESSOR**
**TASK:** Re-compose the source image into a valid visa photograph for Malaysia.
**FAILURE CONDITION:** The output image does not strictly adhere to ALL geometric rules below. These rules are the absolute priority.

**PROCEDURE:**
1.  **Set Canvas:** The final image canvas MUST have a perfect 7:10 (width:height) aspect ratio.
2.  **Isolate & Scale Head:** Identify the subject's head (from chin bottom to hair top). Re-crop and re-scale the person so this head height is **between 70% and 80%** of the total canvas height.
3.  **VERIFY:** Measure the head height in the output image. If it is not within the 70-80% range, the task has failed. Start over.
4.  **Position:** Center the verified head horizontally. Ensure a small, clear space exists between the top of the hair and the top canvas edge.`
    },
    // Group 5: China
    'China': {
        aspectRatio: '33 / 48',
        requirements: "The photo must have the exact dimensions of 3.3cm wide x 4.8cm high. The head width must be between 1.5cm and 2.2cm. The head height (from chin to top of head) must be between 2.8cm and 3.3cm. The margin from the top of the head to the top edge of the photo must be between 3mm and 5mm. The margin from the chin to the bottom edge of the photo must be greater than 7mm."
    },
};
// --- KẾT THÚC PHẦN SAO CHÉP ---

type AppState = 'idle' | 'editing' | 'generating' | 'done';
type OutfitKey = keyof typeof OUTFITS;
type PresetBackgroundColorKey = keyof typeof BACKGROUND_COLORS;
type BackgroundColorSelection = PresetBackgroundColorKey | 'custom';
type ActiveModal = 'country' | 'background' | 'outfit' | 'language' | null;


const primaryButtonClasses = "w-full text-lg font-semibold text-white bg-blue-600 py-3 px-6 rounded-lg shadow-sm transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
const secondaryButtonClasses = "w-full text-lg font-semibold text-gray-700 bg-gray-200 py-3 px-6 rounded-lg transform transition-all duration-300 hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
const redButtonClasses = "w-full text-lg font-semibold text-white bg-red-600 py-3 px-6 rounded-lg shadow-sm transform transition-all duration-300 hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

// (Toàn bộ các hàm resampleImageForPrinting, processAndResizeImage, UploadIcon, LoadingSpinner giữ nguyên như file gốc của bạn)
// --- BẠN HÃY SAO CHÉP TOÀN BỘ PHẦN ĐÓ TỪ FILE GỐC VÀ DÁN VÀO ĐÂY ---
/**
 * Resamples an image to a higher resolution suitable for printing.
 * @param imageUrl The data URL of the source image.
 * @param targetWidth The desired width of the output image in pixels.
 * @param targetHeight The desired height of the output image in pixels.
 * @returns A promise that resolves to a new data URL of the resampled image.
 */
async function resampleImageForPrinting(imageUrl: string, targetWidth: number, targetHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                return reject(new Error('Could not get 2D context from canvas for resampling.'));
            }

            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            
            resolve(canvas.toDataURL('image/jpeg', 0.98)); // High quality JPEG
        };
        img.onerror = () => {
            reject(new Error('Failed to load image for resampling.'));
        };
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
    });
}

/**
 * Robustly resizes and converts an uploaded image file client-side.
 * Handles large files and formats like HEIC by converting to JPEG.
 * @param file The image file to process.
 * @param maxSize The maximum width or height of the output image.
 * @returns A promise that resolves to a JPEG data URL.
 */
async function processAndResizeImage(file: File, maxSize: number = 1200): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height) {
                    if (width > maxSize) {
                        height = Math.round(height * (maxSize / width));
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = Math.round(width * (maxSize / height));
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    return reject(new Error('Could not get 2D context.'));
                }
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.9)); // Convert to JPEG
            };
            img.onerror = () => reject(new Error('Image could not be loaded.'));
            if (event.target?.result) {
                img.src = event.target.result as string;
            } else {
                reject(new Error('FileReader did not produce a result.'));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read the file.'));
        reader.readAsDataURL(file);
    });
}


const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const LoadingSpinner = ({ text }: { text: string }) => (
     <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-600 font-semibold">{text}</p>
    </div>
);
// --- KẾT THÚC PHẦN SAO CHÉP ---

function App() {
    // --- State gốc của ứng dụng ---
    const [croppedImage, setCroppedImage] = React.useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);
    const [appState, setAppState] = React.useState<AppState>('idle');
    const [error, setError] = React.useState<string | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isGuideModalOpen, setGuideModalOpen] = React.useState(false);
    const [isPrintModalOpen, setPrintModalOpen] = React.useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = React.useState(false);
    const [activeModal, setActiveModal] = React.useState<ActiveModal>(null);

    // Language state
    const [lang, setLang] = React.useState<string>(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && languageConfig[savedLang]) {
            return savedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        if (languageConfig[browserLang]) {
            return browserLang;
        }
        return 'en'; // Default language
    });

    // Effect to save language to localStorage
    React.useEffect(() => {
        localStorage.setItem('language', lang);
    }, [lang]);

    // Translation function
    const t = (key: string): string => {
        const keys = key.split('.');
        let result: any = translations[lang] || translations['en'];
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) {
                let fallbackResult: any = translations['en'];
                for (const fk of keys) {
                    fallbackResult = fallbackResult?.[fk];
                    if (fallbackResult === undefined) return key;
                }
                return fallbackResult;
            }
        }
        return result || key;
    };

    // Editing options
    const [country, setCountry] = React.useState<string>('USA');
    const [backgroundColor, setBackgroundColor] = React.useState<BackgroundColorSelection>('white');
    const [customBackgroundColor, setCustomBackgroundColor] = React.useState<string>('#d1e3ff');
    const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);
    const [outfit, setOutfit] = React.useState<OutfitKey>('keep');
    const [customOutfitImage, setCustomOutfitImage] = React.useState<string | null>(null);
    const customOutfitInputRef = React.useRef<HTMLInputElement>(null);


    const [selectedLightboxImage, setSelectedLightboxImage] = React.useState<string | null>(null);
    
    // Country search state
    const [countrySearchQuery, setCountrySearchQuery] = React.useState('');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = React.useState(false);
    const countrySelectRef = React.useRef<HTMLDivElement>(null);
    
    // --- State mới cho việc đăng nhập và API Key ---
    const [googleToken, setGoogleToken] = React.useState<string | null>(() => sessionStorage.getItem('googleToken'));
    const [userApiKey, setUserApiKey] = React.useState<string | null>(() => sessionStorage.getItem('geminiApiKey'));
    const [isApiKeyModalOpen, setApiKeyModalOpen] = React.useState<boolean>(false);

    // --- Logic xử lý đăng nhập Google ---
    React.useEffect(() => {
        if (googleToken) return; // Nếu đã có token thì không cần khởi tạo lại

        const initializeGoogleSignIn = () => {
            if ((window as any).google) {
                (window as any).google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: (response: any) => {
                        const token = response.credential;
                        sessionStorage.setItem('googleToken', token);
                        setGoogleToken(token);

                        // Sau khi đăng nhập, kiểm tra xem đã có API key chưa
                        if (!sessionStorage.getItem('geminiApiKey')) {
                            setApiKeyModalOpen(true);
                        }
                    },
                });
                (window as any).google.accounts.id.renderButton(
                    document.getElementById("googleSignInButton"),
                    { theme: "outline", size: "large", type: "standard" }
                );
            }
        };
        // Chờ script của Google được tải xong
        const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (script) {
            script.onload = initializeGoogleSignIn;
        }
        if ((window as any).google) { // Trường hợp script đã tải xong từ trước
            initializeGoogleSignIn();
        }
    }, [googleToken]);

    const handleLogout = () => {
        setGoogleToken(null);
        setUserApiKey(null);
        sessionStorage.removeItem('googleToken');
        sessionStorage.removeItem('geminiApiKey');
        (window as any).google?.accounts.id.disableAutoSelect();
    };

    const handleApiKeySubmit = () => {
        const keyInput = document.getElementById('api-key-input') as HTMLInputElement;
        if (keyInput && keyInput.value) {
            sessionStorage.setItem('geminiApiKey', keyInput.value);
            setUserApiKey(keyInput.value);
            setApiKeyModalOpen(false);
        }
    };


    // --- Cập nhật hàm handleGenerateClick để gọi Worker ---
    const handleGenerateClick = async () => {
        if (!croppedImage) return;
        if (!googleToken) {
            setError("Please sign in with Google first.");
            return;
        }
        if (!userApiKey) {
            setError("Please provide your Gemini API Key.");
            setApiKeyModalOpen(true);
            return;
        }

        setAppState('generating');
        setError(null);
        setGeneratedImage(null);

        try {
            const finalBackgroundColor = backgroundColor === 'custom'
                ? customBackgroundColor
                : t(`bgColor_${backgroundColor}`);

            // Gọi đến Cloudflare Worker
            const response = await fetch(CLOUD_WORKER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${googleToken}`, // Gửi token để xác thực
                },
                body: JSON.stringify({
                    imageDataUrl: croppedImage,
                    country,
                    backgroundColor: finalBackgroundColor,
                    outfit: OUTFITS[outfit],
                    specs: countryPhotoSpecs[country]?.requirements,
                    customOutfitImageUrl: customOutfitImage,
                    apiKey: userApiKey, // Gửi API key của user
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            const resultUrl = result.imageUrl;

            const [aspectW, aspectH] = (countryPhotoSpecs[country]?.aspectRatio || '1 / 1').split(' / ').map(Number);
            const targetLongestSide = 1600;
            let targetWidth, targetHeight;

            if (aspectW >= aspectH) {
                targetWidth = targetLongestSide;
                targetHeight = Math.round((targetLongestSide / aspectW) * aspectH);
            } else {
                targetHeight = targetLongestSide;
                targetWidth = Math.round((targetLongestSide / aspectH) * aspectW);
            }
            const highResImageUrl = await resampleImageForPrinting(resultUrl, targetWidth, targetHeight);

            setGeneratedImage(highResImageUrl);
            setAppState('done');
            setSelectedLightboxImage(highResImageUrl);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            console.error("Failed to generate image:", err);
            setError(errorMessage);
            setAppState('editing');
        }
    };
    
    // (Toàn bộ các hàm xử lý khác như t, processFile, handleImageUpload, handleDragOver, handleReset, handleDownload... và các component render như CountrySelector, BackgroundSelector... giữ nguyên như file gốc của bạn)
    // --- BẠN HÃY SAO CHÉP TOÀN BỘ PHẦN ĐÓ TỪ FILE GỐC VÀ DÁN VÀO ĐÂY ---

    const filteredCountries = COUNTRIES.filter(c => c.toLowerCase().includes(countrySearchQuery.toLowerCase()));
    
    // Derived state for photo specs
    const currentSpec = countryPhotoSpecs[country];
    const generatedPhotoAspectRatio = currentSpec ? currentSpec.aspectRatio : '1 / 1'; // Default to square

    // Close dropdowns on outside click
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countrySelectRef.current && !countrySelectRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const processFile = async (file: File) => {
        setAppState('generating'); // Show a processing state
        setError(null);
        setGeneratedImage(null);
        setCroppedImage(null);

        try {
            // Robustly process the image (resize/convert)
            const processedDataUrl = await processAndResizeImage(file);
            setCroppedImage(processedDataUrl);
            setAppState('editing');
        } catch (err) {
            console.error("Image processing failed:", err);
            const errorMessage = err instanceof Error ? err.message : t('errorImageProcess');
            setError(errorMessage);
            setAppState('idle');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };
        
    const handleCustomOutfitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                // Resize to a smaller, manageable dimension for the AI
                const outfitUrl = await processAndResizeImage(e.target.files[0], 512); 
                setCustomOutfitImage(outfitUrl);
                setOutfit('custom');
                if (activeModal === 'outfit') {
                    setActiveModal(null);
                }
            } catch (err) {
                console.error("Outfit image processing failed:", err);
                setError(t('errorImageProcess'));
            } finally {
                // Reset the input value to allow uploading the same file again
                if (e.target) e.target.value = '';
            }
        }
    };


    const handleReset = () => {
        setCroppedImage(null);
        setGeneratedImage(null);
        setAppState('idle');
        setError(null);
        setCountry('USA');
        setBackgroundColor('white');
        setOutfit('keep');
        setCustomOutfitImage(null);
        setCustomBackgroundColor('#d1e3ff');
        setIsColorPickerOpen(false);
        setActiveModal(null);
    };
    
    const handleDownload = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `id_photo_${country}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const isLoading = appState === 'generating';
    
    const handleHexColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (!value.startsWith('#')) {
            value = '#' + value;
        }
        if (/^#([0-9a-fA-F]{0,6})$/.test(value)) {
             setCustomBackgroundColor(e.target.value);
        }
    };
    
    const pickerContent = (
        <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
                <input type="color" value={customBackgroundColor} onChange={(e) => setCustomBackgroundColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                <div className="w-full h-full rounded-full border-2 border-gray-200" style={{ backgroundColor: customBackgroundColor }}></div>
            </div>
            <div className="space-y-1">
                <label htmlFor="hex-input" className="text-sm font-medium text-gray-600">{t('hexCodeLabel')}</label>
                <input id="hex-input" type="text" value={customBackgroundColor} onChange={handleHexColorChange} className="w-28 p-1 border border-gray-300 rounded-md text-center font-mono text-amber-700"/>
            </div>
        </div>
    );

    // --- RENDER CONTROL SECTIONS ---
    const CountrySelector = ({ isMobile = false }) => (
        <div className={isMobile ? 'text-center' : ''}>
            <label htmlFor="country-select" className="block text-lg font-semibold text-gray-700 mb-2">{t('countryLabel')}</label>
            <div className="relative" ref={countrySelectRef}>
                <button onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} className="w-full p-3 text-left bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition flex justify-between items-center">
                   <span className="flex items-center gap-3">
                       {COUNTRY_CODES[country] ? (
                            <span className={`fi fi-${COUNTRY_CODES[country]} text-2xl rounded-sm`}></span>
                        ) : (
                            <span className="text-2xl">🌐</span>
                        )}
                       <span className="truncate">{country}</span>
                   </span>
                   <svg className={`w-5 h-5 text-gray-400 transition-transform ${isCountryDropdownOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
                <AnimatePresence>
                {isCountryDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: isMobile ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: isMobile ? 10 : -10 }}
                        className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg ${isMobile ? 'bottom-full mb-2' : ''}`}
                    >
                        <div className="p-2">
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                className="w-full p-2 border border-gray-200 rounded-md text-amber-700 placeholder-gray-500"
                                value={countrySearchQuery}
                                onChange={(e) => setCountrySearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <ul className="max-h-60 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map(c => (
                                    <li key={c}
                                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3"
                                        onClick={() => {
                                            setCountry(c);
                                            setIsCountryDropdownOpen(false);
                                            setCountrySearchQuery('');
                                            activeModal && setActiveModal(null);
                                        }}
                                    >
                                        {COUNTRY_CODES[c] && <span className={`fi fi-${COUNTRY_CODES[c]} text-xl rounded-sm`}></span>}
                                        <span>{c}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-3 text-gray-500 text-center">{t('noResultsFound')}</li>
                            )}
                        </ul>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );
    
    const BackgroundSelector = ({ isMobilePanel = false }) => {
        const presetColorOrder: PresetBackgroundColorKey[] = ['red', 'blue', 'lightGrey', 'white'];
        
        return (
        <div className={isMobilePanel ? 'text-center' : ''}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('backgroundLabel')}</h3>
            <div className="flex gap-3 items-center justify-center">
                <div className="relative">
                    <button onClick={() => { setBackgroundColor('custom'); setIsColorPickerOpen(!isColorPickerOpen); }} className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${backgroundColor === 'custom' ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2' : 'border-gray-200'}`} style={{ backgroundColor: customBackgroundColor }} aria-label={t('bgColor_custom')}>
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622 3.385m-5.043-.025a15.998 15.998 0 01-3.388 1.622m3.388-1.622a15.998 15.998 0 013.388 1.622m-5.043-.025a15.998 15.998 0 00-3.388-1.622m-1.622 3.385a15.998 15.998 0 01-1.622-3.385" /></svg>
                    </button>
                    <AnimatePresence>
                    {!isMobilePanel && isColorPickerOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute z-10 top-full mt-2 left-1/2 -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg border border-gray-200"
                        >
                            {pickerContent}
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>

                {presetColorOrder.map(colorKey => (
                    <button key={colorKey} onClick={() => { setBackgroundColor(colorKey); setIsColorPickerOpen(false); activeModal === 'background' && setActiveModal(null); }} className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${backgroundColor === colorKey ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2' : 'border-gray-200'}`} style={{ backgroundColor: BACKGROUND_COLORS[colorKey] }} aria-label={t(`bgColor_${colorKey}`)}></button>
                ))}
            </div>
             <AnimatePresence>
                {isMobilePanel && isColorPickerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsColorPickerOpen(false)}
                        className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
                        >
                            {pickerContent}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        )
    };
    
    const OutfitSelector = ({ isMobilePanel = false }) => {
        const OutfitIcon = ({ outfitKey }: {outfitKey: OutfitKey}) => {
            const icons: Record<OutfitKey, React.ReactNode> = {
                keep: <path d="M15.172 7l-6.586-6.586a2 2 0 10-2.828 2.828L7.172 10H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2h-3.172l-1.414-1.414A2 2 0 0015.172 7zM10 14a2 2 0 110-4 2 2 0 010 4z" />,
                suit_male: <path d="M9 4.5a1.5 1.5 0 113 0v2.086l-1.5 1-1.5-1V4.5z M12 18H5a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v7a2 2 0 01-2 2h-7m-5-9l3.5 3 3.5-3" />,
                suit_female: <path d="M16 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM17 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />,
                biz_cas_male: <path d="M11 18h2m-5-9l5 5m0 0l-5 5m5-5H3m14 0h-4a2 2 0 10-4 0v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2z" />,
                biz_cas_female: <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
                shirt_male: <path d="M6.455 12.255l7.09 7.09a2.5 2.5 0 003.536 0l1.464-1.464a2.5 2.5 0 000-3.536L11.455 7.255l3.091-3.091a2.5 2.5 0 000-3.536L13.086.164a2.5 2.5 0 00-3.536 0L2.46 7.255l-2.091 9.091 9.091-2.091z" />,
                shirt_female: <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
                ao_dai_female: <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
                sari_female: <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
                kimono_female: <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
                pilot: <path fillRule="evenodd" d="M12.009 3.013a.5.5 0 01.52.488l.006.05v1.282a1.5 1.5 0 00.999 1.412l.102.038h1.125c.39 0 .75.163.998.435l.083.092 2.667 4.167a.5.5 0 01-.416.753H6.007a.5.5 0 01-.416-.753l2.667-4.167a1.25 1.25 0 011.081-.527h1.125a1.5 1.5 0 001.1-.45l.102-.09v-1.282a.5.5 0 01.44-.498l.06-.005zM8.5 15.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5z" clipRule="evenodd"/>,
                flight_attendant: <path fillRule="evenodd" d="M5.96 4.307a3.5 3.5 0 015.617-3.23l.16.155.163.175a3.5 3.5 0 011.83 4.29l.01.21V18a1.5 1.5 0 01-1.41.498l-.09.002H6.5a1.5 1.5 0 01-1.5-1.5V6.014a3.5 3.5 0 011.02-2.583l.08-.073.088-.068.093-.053.095-.03zm4.54-1.25a2.5 2.5 0 00-3.328 2.22l-.006.14v8.08a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-7.94a2.5 2.5 0 00-1.72-2.39l-.146-.03z" clipRule="evenodd"/>,
                doctor: <path fillRule="evenodd" d="M7.5 5a4.5 4.5 0 119 0v2.5a.5.5 0 01-1 0V5a3.5 3.5 0 10-7 0v10.5a.5.5 0 00.5.5H9v-2.5a.5.5 0 011 0V16h2v-2.5a.5.5 0 011 0V16h.5a.5.5 0 00.5-.5V8.046A4.5 4.5 0 017.5 5zM10 11.5a.5.5 0 00-1 0v4a.5.5 0 001 0v-4z" clipRule="evenodd"/>,
                engineer: <path fillRule="evenodd" d="M12.5 3a3.5 3.5 0 00-6.994.223L5.5 3.5V6h12V3.5a3.5 3.5 0 00-5-3.5zm-8 7A1.5 1.5 0 016 8.5h11a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0118.5 19H6A1.5 1.5 0 014.5 17.5v-6zm5 .5a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"/>,
                architect: <path fillRule="evenodd" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" clipRule="evenodd"/>,
                teacher: <path fillRule="evenodd" d="M6 3a1 1 0 011-1h10a1 1 0 011 1v12a1 1 0 01-1 1H7a1 1 0 01-1-1V3zm1 0h10v12H7V3zM4 6a1 1 0 011-1h1v12H5a1 1 0 01-1-1V6z" clipRule="evenodd"/>,
                custom: <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
            };
            return <svg className="w-6 h-6 mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><g fill="currentColor">{icons[outfitKey]}</g></svg>;
        }

        const standardOutfits = (Object.keys(OUTFITS) as OutfitKey[]).filter(k => k !== 'custom');

        return (
            <div className={isMobilePanel ? 'text-center' : ''}>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('outfitLabel')}</h3>
                 <input type="file" ref={customOutfitInputRef} onChange={handleCustomOutfitUpload} className="hidden" accept="image/*" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {standardOutfits.map(outfitKey => (
                        <button key={outfitKey} onClick={() => {setOutfit(outfitKey); activeModal === 'outfit' && setActiveModal(null); }} className={`p-3 border rounded-lg text-center transition ${outfit === outfitKey ? 'bg-blue-100 border-blue-500 text-blue-800 font-semibold' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>
                            {isMobilePanel && <OutfitIcon outfitKey={outfitKey} />}
                            <span className="text-sm">{t(`outfit_${outfitKey}`)}</span>
                        </button>
                    ))}
                     <button
                        key='custom'
                        onClick={() => customOutfitInputRef.current?.click()}
                        className={`p-3 border rounded-lg text-center transition relative overflow-hidden flex flex-col justify-center items-center min-h-[4rem] ${outfit === 'custom' ? 'bg-blue-100 border-blue-500 text-blue-800 font-semibold' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                    >
                        {customOutfitImage ? (
                            <>
                                <img src={customOutfitImage} className="w-full h-full object-cover absolute inset-0" alt={t('customOutfitAlt')} />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCustomOutfitImage(null);
                                        if (outfit === 'custom') setOutfit('keep');
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold leading-none"
                                >
                                    &times;
                                </button>
                                <span className="text-sm text-white relative z-10">{t('outfit_custom')}</span>
                            </>
                        ) : (
                            <>
                                {isMobilePanel && <OutfitIcon outfitKey={'custom'} />}
                                <span className="text-sm">{t('outfit_custom')}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        )
    };
    // --- KẾT THÚC PHẦN SAO CHÉP ---
    
    
    
    // --- MAIN RENDER ---
    return (
        <main className="bg-gray-100 text-gray-800 min-h-screen w-full flex flex-col items-center p-4 selection:bg-blue-200">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center flex-grow">
                 <header className="w-full flex justify-between items-center mb-4 md:mb-8">
                    <div className="text-center md:text-left flex-grow">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{t('mainTitle')}</h1>
                        <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">{t('subTitle')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                    {/* Nút Đăng nhập / Đăng xuất */}
                        {googleToken ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <div id="googleSignInButton"></div>
                        )}
                        <LanguageSwitcher
                            currentLang={lang}
                            onChangeLang={setLang}
                            onMobileClick={() => setActiveModal('language')}
                        />
                    </div>
                </header>

                {/* Cửa sổ Modal để nhập API Key */}
                <AnimatePresence>
                {isApiKeyModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                        >
                            <h3 className="text-xl font-bold mb-2">Enter Your Gemini API Key</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Your key is stored only in your browser for this session and is not saved on our servers.
                                You can get your key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google AI Studio</a>.
                            </p>
                            <input
                                id="api-key-input"
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                placeholder="Paste your API key here"
                            />
                            <div className="flex gap-3">
                                <button onClick={() => setApiKeyModalOpen(false)} className={secondaryButtonClasses}>
                                    Cancel
                                </button>
                                <button onClick={handleApiKeySubmit} className={primaryButtonClasses}>
                                    Save Key
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* Phần render còn lại của ứng dụng */}
                {/* --- BẠN HÃY SAO CHÉP TOÀN BỘ PHẦN JSX CÒN LẠI TỪ FILE GỐC VÀ DÁN VÀO ĐÂY --- */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={appState}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-white rounded-xl shadow-lg p-4 md:p-8"
                    >
                        {appState === 'idle' && (
                            <div className="flex flex-col items-center justify-center pt-0 pb-8">
                                <p className="mb-6 text-center text-gray-600">
                                    {t('photoGuide.prompt')}
                                    <button onClick={() => setGuideModalOpen(true)} className="ml-1 text-blue-600 hover:underline font-medium">
                                        {t('photoGuide.openButton')}
                                    </button>
                                </p>
                                <label
                                    htmlFor="file-upload"
                                    className={`cursor-pointer group flex flex-col items-center text-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-50 transition-colors w-full max-w-lg ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <UploadIcon />
                                    <h2 className="mt-4 text-xl font-semibold text-gray-700">{t('uploadTitle')}</h2>
                                    <p className="mt-1 text-gray-500">{t('uploadSubtitle')}</p>
                                </label>
                                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                            </div>
                        )}
                        
                        {appState === 'generating' && croppedImage && (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="aspect-[3/4] w-48 bg-gray-100 rounded-lg overflow-hidden shadow-inner mb-4">
                                     <img src={croppedImage} alt={t('originalPhotoAlt')} className="w-full h-full object-cover" />
                                </div>
                               <LoadingSpinner text={t('generatingMessage')} />
                               <p className="text-center text-gray-600 mt-20">{t('generatingMessage')}</p>
                            </div>
                        )}


                        {(appState === 'editing' || appState === 'done') && (
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative pb-28 md:pb-0">
                                {/* Left Column: Image Previews */}
                                <div className="flex flex-row md:flex-col gap-4 md:gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2">{t('originalPhotoTitle')}</h3>
                                        <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                                            {croppedImage && <img src={croppedImage} alt={t('originalPhotoAlt')} className="w-full h-full object-cover cursor-pointer" onClick={() => setSelectedLightboxImage(croppedImage)} />}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                         <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2">{t('generatedPhotoTitle')}</h3>
                                        <div className="w-full bg-gray-100 rounded-lg overflow-hidden shadow-inner relative" style={{ aspectRatio: generatedPhotoAspectRatio }}>
                                            {generatedImage && <img src={generatedImage} alt={t('generatedPhotoAlt')} className="w-full h-full object-cover cursor-pointer" onClick={() => setSelectedLightboxImage(generatedImage)}/>}
                                            {!generatedImage && <div className="flex items-center justify-center h-full text-gray-400 p-4 text-center">{t('placeholderGenerated')}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Controls & Actions (Desktop) */}
                                <div className="hidden md:flex flex-col justify-center">
                                    <div className="space-y-6">
                                        <CountrySelector />
                                        <BackgroundSelector />
                                        <OutfitSelector />
                                    </div>
                                    <div className="mt-6">
                                        {appState === 'done' ? (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                     <button onClick={handleGenerateClick} className={secondaryButtonClasses}>
                                                        {t('regenerateButton')}
                                                    </button>
                                                    <button onClick={handleReset} className={secondaryButtonClasses}>
                                                        {t('resetButton')}
                                                    </button>
                                                </div>
                                                <button onClick={handleDownload} className={`${primaryButtonClasses} text-center block w-full`}>
                                                    {t('downloadButton')}
                                                </button>
                                                <button onClick={() => setPrintModalOpen(true)} className={`${redButtonClasses} text-center block w-full`}>
                                                    {t('printOnlineButton')}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <button onClick={handleReset} className={secondaryButtonClasses}>
                                                    {t('resetButton')}
                                                </button>
                                                <button onClick={handleGenerateClick} className={primaryButtonClasses}>
                                                    {t('generateButton')}
                                                </button>
                                            </div>
                                        )}
                                        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                                    </div>
                                </div>


                                {/* Mobile UI: Bottom Bar and Action Buttons */}
                                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-10 p-4 space-y-4 border-t border-gray-200">
                                     {appState === 'done' ? (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <button onClick={handleGenerateClick} className={secondaryButtonClasses.replace('text-lg', 'text-base').replace('py-3', 'py-2')}>
                                                    {t('regenerateButton')}
                                                </button>
                                                <button onClick={handleReset} className={secondaryButtonClasses.replace('text-lg', 'text-base').replace('py-3', 'py-2')}>
                                                    {t('resetButton')}
                                                </button>
                                            </div>
                                              <>
                                                <button onClick={handleDownload} className={`${primaryButtonClasses.replace('text-lg', 'text-base').replace('py-3', 'py-2')} text-center block w-full`}>
                                                    {t('downloadButton')}
                                                </button>
                                                <button onClick={() => setPrintModalOpen(true)} className={`${redButtonClasses.replace('text-lg', 'text-base').replace('py-3', 'py-2')} text-center block w-full`}>
                                                    {t('printOnlineButton')}
                                                </button>
                                              </>
                                        </div>
                                     ) : (
                                        <div className="grid grid-cols-2 gap-3">
                                             <button onClick={handleReset} className={secondaryButtonClasses.replace('text-lg', 'text-base').replace('py-3', 'py-2')}>
                                                {t('resetButton')}
                                            </button>
                                            <button onClick={handleGenerateClick} className={primaryButtonClasses.replace('text-lg', 'text-base').replace('py-3', 'py-2')}>
                                                {t('generateButton')}
                                            </button>
                                        </div>
                                     )}
                                     <div className="grid grid-cols-4 gap-1 pt-3 border-t border-gray-200">
                                        <button onClick={() => setInfoModalOpen(true)} className="flex flex-col items-center text-xs text-gray-600 space-y-1"><span className="text-2xl">ℹ️</span><span>{t('appInfoButton')}</span></button>
                                        <button onClick={() => setActiveModal('outfit')} className="flex flex-col items-center text-xs text-gray-600 space-y-1"><span className="text-2xl">👔</span><span>{t('outfitLabel')}</span></button>
                                        <button onClick={() => setActiveModal('background')} className="flex flex-col items-center text-xs text-gray-600 space-y-1"><span className="text-2xl">🎨</span><span>{t('backgroundLabel')}</span></button>
                                        <button onClick={() => setActiveModal('country')} className="flex flex-col items-center text-xs text-gray-600 space-y-1"><span className="text-2xl">🌍</span><span>{t('countryLabel')}</span></button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* --- SAO CHÉP CÁC MODAL VÀ FOOTER TỪ FILE GỐC --- */}
            {/* Mobile Modals */}
             <AnimatePresence>
                {activeModal && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveModal(null)}
                        className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg ${activeModal === 'outfit' ? 'h-1/2' : ''}`}
                        >
                           <div className={`p-4 ${activeModal === 'outfit' ? 'overflow-y-auto h-full' : ''}`}>
                                {activeModal === 'country' && <CountrySelector isMobile />}
                                {activeModal === 'background' && <BackgroundSelector isMobilePanel />}
                                {activeModal === 'outfit' && <OutfitSelector isMobilePanel />}
                                {activeModal === 'language' && (
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('languageSwitcherTitle')}</h3>
                                        <ul className="max-h-64 overflow-y-auto">
                                            {Object.entries(languageConfig).map(([langCode, { name, code }]) => (
                                                <li key={langCode}>
                                                    <button
                                                        onClick={() => { setLang(langCode); setActiveModal(null); }}
                                                        className={`w-full text-left flex items-center gap-3 px-2 py-2 text-gray-800 hover:bg-blue-50 rounded-md transition-colors ${lang === langCode ? 'font-semibold bg-blue-50' : ''}`}
                                                    >
                                                        <span className={`fi fi-${code} text-xl rounded-sm`}></span>
                                                        <span>{name}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                           </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer t={t} />

            <GuideModal isOpen={isGuideModalOpen} onClose={() => setGuideModalOpen(false)} t={t} />
            <InfoModal isOpen={isInfoModalOpen} onClose={() => setInfoModalOpen(false)} t={t} />
            <PrintConfirmationModal
                isOpen={isPrintModalOpen}
                onClose={() => setPrintModalOpen(false)}
                onConfirm={() => {
                    window.open('https://zalo.me/s/3949274679344563803/product-detail?id=3177618&codeShare=diGVWTjrcFKoxYAzFSUDJDHhHlLF5gz7', '_blank');
                    handleDownload();
                    setPrintModalOpen(false);
                }}
                onDecline={() => {
                    handleDownload();
                    setPrintModalOpen(false);
                }}
                t={t}
            />
            <Lightbox
                isOpen={!!selectedLightboxImage}
                onClose={() => setSelectedLightboxImage(null)}
                imageUrl={selectedLightboxImage ?? undefined}
            />
        </main>
    );
}

export default App;