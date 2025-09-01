/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from './components/Lightbox';
import LanguageSwitcher from './components/LanguageSwitcher';
import { translations, languageConfig } from './translations';
import GuideModal from './components/GuideModal';
import PrintConfirmationModal from './components/PrintConfirmationModal';
import InfoModal from './components/InfoModal';
import Footer from './components/Footer';

// !!! QUAN TRỌNG: DÁN URL WORKER CỦA BẠN VÀO ĐÂY
const CLOUD_WORKER_URL = "https://my-gemini-worker.phanmanhkhang89.workers.dev/"; 
// !!! QUAN TRỌNG: DÁN GOOGLE CLIENT ID CỦA BẠN VÀO ĐÂY
const GOOGLE_CLIENT_ID = "54011594-34e4-41aa-b438-a81b0fa78ee7.apps.googleusercontent.com";


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
    'Pakistan': 'pk', 'Palau': 'pw', 'Palestine': 'ps', 'Panama': 'pa', 'Papua new Guinea': 'pg', 'Paraguay': 'py', 'Peru': 'pe', 'Philippines': 'ph', 'Poland': 'pl', 'Portugal': 'pt',
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
    'red': '#FFEBEE',
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

const schengenSpec = {
    aspectRatio: '7 / 9',
    requirements: `**MANDATORY TECHNICAL DIRECTIVE FOR IMAGE PROCESSOR**...` // (Nội dung giữ nguyên)
};
// ... Dán tất cả các hằng số specs khác (sea4x6Spec, malaysiaSpec, etc.) vào đây ...
const countryPhotoSpecs: Record<string, { aspectRatio: string; requirements: string }> = {
    // ... Dán toàn bộ nội dung của countryPhotoSpecs vào đây ...
};

type AppState = 'idle' | 'liveCapture' | 'editing' | 'generating' | 'done';
type OutfitKey = keyof typeof OUTFITS;
type PresetBackgroundColorKey = keyof typeof BACKGROUND_COLORS;
type BackgroundColorSelection = PresetBackgroundColorKey | 'custom';
type ActiveModal = 'country' | 'background' | 'outfit' | 'language' | null;
type QualityWarning = { warning: string; advice: string; type: 'success' | 'warning' };

const OUTFIT_CATEGORIES: { titleKey: string; outfits: OutfitKey[] }[] = [
    { titleKey: 'outfitCategory_male', outfits: ['suit_male', 'biz_cas_male', 'shirt_male'] },
    { titleKey: 'outfitCategory_female', outfits: ['suit_female', 'biz_cas_female', 'shirt_female', 'ao_dai_female', 'sari_female', 'kimono_female'] },
    { titleKey: 'outfitCategory_professional', outfits: ['pilot', 'flight_attendant', 'doctor', 'engineer', 'architect', 'teacher'] },
];

const primaryButtonClasses = "w-full text-lg font-semibold text-white bg-blue-600 py-3 px-6 rounded-lg shadow-sm transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
const secondaryButtonClasses = "w-full text-lg font-semibold text-gray-700 bg-gray-200 py-3 px-6 rounded-lg transform transition-all duration-300 hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
const redButtonClasses = "w-full text-lg font-semibold text-white bg-red-600 py-3 px-6 rounded-lg shadow-sm transform transition-all duration-300 hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

async function resampleImageForPrinting(imageUrl: string, targetWidth: number, targetHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Could not get 2D context for resampling.'));
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            resolve(canvas.toDataURL('image/webp', 0.95));
        };
        img.onerror = () => reject(new Error('Failed to load image for resampling.'));
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
    });
}

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
                if (!ctx) return reject(new Error('Could not get 2D context.'));
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/webp', 0.9));
            };
            img.onerror = () => reject(new Error('Image could not be loaded.'));
            if (event.target?.result) img.src = event.target.result as string;
            else reject(new Error('FileReader did not produce a result.'));
        };
        reader.onerror = () => reject(new Error('Failed to read the file.'));
        reader.readAsDataURL(file);
    });
}

async function cropImageToPassportFrame(imageUrl: string, box: { x_min: number; y_min: number; x_max: number; y_max: number }): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const { naturalWidth: w, naturalHeight: h } = img;
            const faceLeft = box.x_min * w;
            const faceTop = box.y_min * h;
            const faceWidth = (box.x_max - box.x_min) * w;
            const faceHeight = (box.y_max - box.y_min) * h;
            const targetAspectRatio = 3 / 4;
            const cropHeight = faceHeight / 0.6;
            const cropWidth = cropHeight * targetAspectRatio;
            const faceCenterX = faceLeft + faceWidth / 2;
            let cropX = faceCenterX - cropWidth / 2;
            let cropY = faceTop - cropHeight * 0.2;

            if (cropX < 0) cropX = 0;
            if (cropY < 0) cropY = 0;
            if (cropX + cropWidth > w) cropX = w - cropWidth;
            if (cropY + cropHeight > h) cropY = h - cropHeight;
            if (cropWidth > w) { /* boundary checks */ }

            const canvas = document.createElement('canvas');
            canvas.width = cropWidth;
            canvas.height = cropHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Could not get 2D context for cropping.'));
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
            resolve(canvas.toDataURL('image/webp', 0.95));
        };
        img.onerror = () => reject(new Error('Failed to load image for cropping.'));
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
    });
}

async function createDisplayThumbnail(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const { naturalWidth: w, naturalHeight: h } = img;
            const targetAspectRatio = 3 / 4;
            let cropWidth, cropHeight, cropX, cropY;
            if (w / h > targetAspectRatio) {
                cropHeight = h;
                cropWidth = h * targetAspectRatio;
                cropX = (w - cropWidth) / 2;
                cropY = 0;
            } else {
                cropWidth = w;
                cropHeight = w / targetAspectRatio;
                cropX = 0;
                cropY = (h - cropHeight) / 2;
            }
            const canvas = document.createElement('canvas');
            const maxDisplayWidth = 600;
            let displayWidth = cropWidth;
            let displayHeight = cropHeight;
            if (displayWidth > maxDisplayWidth) {
                displayHeight = (maxDisplayWidth / displayWidth) * displayHeight;
                displayWidth = maxDisplayWidth;
            }
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Could not get 2D context for thumbnail.'));
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, displayWidth, displayHeight);
            resolve(canvas.toDataURL('image/webp', 0.9));
        };
        img.onerror = () => reject(new Error('Failed to load image for thumbnail creation.'));
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
    });
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const LoadingSpinner = ({ text, detail }: { text: string; detail?: string; }) => (
     <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg text-center px-4">
        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-700 font-semibold text-lg">{text}</p>
        {detail && <p className="mt-2 text-sm text-gray-500 max-w-xs">{detail}</p>}
    </div>
);

const LiveCaptureView = ({ onCapture, onCancel, t }: { onCapture: (file: File) => void; onCancel: () => void; t: (key: string) => string; }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let stream: MediaStream | null = null;
        const startCamera = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setError("Camera access is not supported by your browser.");
                return;
            }
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            } catch (err) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
                } catch (fallbackErr) {
                    setError("Could not access camera. Please check browser permissions.");
                    return;
                }
            }
            if (stream && videoRef.current) videoRef.current.srcObject = stream;
        };
        startCamera();
        return () => {
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, []);
    
    const handleCapture = () => {
        if (!videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            if (blob) onCapture(new File([blob], `capture.webp`, { type: 'image/webp' }));
        }, 'image/webp', 0.95);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[3/4] overflow-hidden rounded-lg">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]"></video>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 300 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                        <path d="M 150,50 C 100,50 60,90 60,150 L 60,250 C 60,320 100,350 150,350 C 200,350 240,320 240,250 L 240,150 C 240,90 200,50 150,50 Z" stroke="white" strokeWidth="3" strokeDasharray="10 5" fill="none" />
                    </svg>
                </div>
                 <p className="absolute bottom-4 left-4 right-4 text-white text-center text-sm bg-black/50 p-2 rounded-md">{t('capture.feedback_none')}</p>
            </div>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            <div className="mt-6 flex gap-4">
                <button onClick={onCancel} className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg">{t('resetButton')}</button>
                <button onClick={handleCapture} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {t('capture.button')}
                </button>
            </div>
        </motion.div>
    );
};

const PhotoQualityReport = ({ warnings, isAnalyzing, t }: { warnings: QualityWarning[]; isAnalyzing: boolean; t: (key: string) => string; }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const hasWarnings = warnings.some(w => w.type === 'warning');
    const isSuccess = warnings.some(w => w.type === 'success');

    if (isAnalyzing) { /* ... */ }
    if (!hasWarnings && !isSuccess) return null;
    return (
        <motion.div layout className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white rounded-b-lg overflow-hidden">
            {/* ... nội dung component giữ nguyên ... */}
        </motion.div>
    );
};

function App() {
    // --- STATE (KẾT HỢP TỪ CẢ 2 PHIÊN BẢN) ---
    const [sourceImage, setSourceImage] = React.useState<string | null>(null);
    const [displayImage, setDisplayImage] = React.useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);
    const [appState, setAppState] = React.useState<AppState>('idle');
    const [error, setError] = React.useState<string | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isGuideModalOpen, setGuideModalOpen] = React.useState(false);
    const [isPrintModalOpen, setPrintModalOpen] = React.useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = React.useState(false);
    const [activeModal, setActiveModal] = React.useState<ActiveModal>(null);
    const [loadingMessage, setLoadingMessage] = React.useState<string>('');
    const [loadingDetailMessage, setLoadingDetailMessage] = React.useState<string>('');
    const [isAnalyzingQuality, setIsAnalyzingQuality] = React.useState(false);
    const [qualityWarnings, setQualityWarnings] = React.useState<QualityWarning[]>([]);
    const [lang, setLang] = React.useState<string>(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && languageConfig[savedLang]) return savedLang;
        const browserLang = navigator.language.split('-')[0];
        if (languageConfig[browserLang]) return browserLang;
        return 'en';
    });
    const [country, setCountry] = React.useState<string>('USA');
    const [backgroundColor, setBackgroundColor] = React.useState<BackgroundColorSelection>('white');
    const [customBackgroundColor, setCustomBackgroundColor] = React.useState<string>('#d1e3ff');
    const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);
    const [outfit, setOutfit] = React.useState<OutfitKey>('keep');
    const [customOutfitImage, setCustomOutfitImage] = React.useState<string | null>(null);
    const customOutfitInputRef = React.useRef<HTMLInputElement>(null);
    const [selectedLightboxImage, setSelectedLightboxImage] = React.useState<string | null>(null);
    const [countrySearchQuery, setCountrySearchQuery] = React.useState('');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = React.useState(false);
    const countrySelectRef = React.useRef<HTMLDivElement>(null);
    
    // State cho việc đăng nhập và API Key
    const [googleToken, setGoogleToken] = React.useState<string | null>(() => sessionStorage.getItem('googleToken'));
    const [userApiKey, setUserApiKey] = React.useState<string | null>(() => sessionStorage.getItem('geminiApiKey'));
    const [isApiKeyModalOpen, setApiKeyModalOpen] = React.useState<boolean>(false);

    // --- LOGIC ---

    React.useEffect(() => { localStorage.setItem('language', lang); }, [lang]);

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

    // Hàm gọi đến Worker
    async function callWorker(action: string, payload: object) {
        if (!googleToken) {
            setError("Please sign in with Google first.");
            throw new Error("User is not authenticated.");
        }
        if (!userApiKey) {
            setApiKeyModalOpen(true);
            throw new Error("Please provide your Gemini API Key.");
        }
        const response = await fetch(CLOUD_WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${googleToken}` },
            body: JSON.stringify({ action, payload: { ...payload, apiKey: userApiKey } }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }
        return response.json();
    }

    // Logic đăng nhập Google
    React.useEffect(() => {
        if (googleToken) return;
        const initializeGoogleSignIn = () => {
            if ((window as any).google) {
                (window as any).google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: (response: any) => {
                        const token = response.credential;
                        sessionStorage.setItem('googleToken', token);
                        setGoogleToken(token);
                        if (!sessionStorage.getItem('geminiApiKey')) setApiKeyModalOpen(true);
                    },
                });
                (window as any).google.accounts.id.renderButton(
                    document.getElementById("googleSignInButton"),
                    { theme: "outline", size: "large", type: "standard", ux_mode: "redirect" }
                );
            }
        };
        const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (script) script.onload = initializeGoogleSignIn;
        if ((window as any).google) initializeGoogleSignIn();
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

    const runQualityCheck = async (imageDataUrl: string) => {
        setIsAnalyzingQuality(true);
        setQualityWarnings([]);
        try {
            const quality = await callWorker('analyze', { imageDataUrl });
            const warnings: QualityWarning[] = [];
            if (quality.isBlurry) warnings.push({ warning: t('qualityCheck.warning_blurry'), advice: t('qualityCheck.advice_blurry'), type: 'warning' });
            if (quality.lightingQuality !== 'good') warnings.push({ warning: t('qualityCheck.warning_lighting'), advice: t('qualityCheck.advice_lighting'), type: 'warning' });
            if (quality.expression !== 'neutral') warnings.push({ warning: t('qualityCheck.warning_expression'), advice: t('qualityCheck.advice_expression'), type: 'warning' });
            if (quality.isObstructed) warnings.push({ warning: t('qualityCheck.warning_obstruction'), advice: t('qualityCheck.advice_obstruction'), type: 'warning' });
            if (quality.headTilt !== 'straight') warnings.push({ warning: t('qualityCheck.warning_tilt'), advice: t('qualityCheck.advice_tilt'), type: 'warning' });
            if (warnings.length === 0) warnings.push({ warning: t('qualityCheck.success'), advice: t('qualityCheck.success_advice'), type: 'success' });
            setQualityWarnings(warnings);
        } catch (err) {
            console.error("Quality check failed:", err);
            setQualityWarnings([]);
        } finally {
            setIsAnalyzingQuality(false);
        }
    };

    const processFile = async (file: File) => {
        setAppState('generating');
        setError(null);
        setGeneratedImage(null);
        setSourceImage(null);
        setDisplayImage(null);
        setQualityWarnings([]);
        try {
            setLoadingMessage(t('processingMessage'));
            const processedDataUrl = await processAndResizeImage(file);
            setSourceImage(processedDataUrl);
            const thumbnailDataUrl = await createDisplayThumbnail(processedDataUrl);
            setDisplayImage(thumbnailDataUrl);
            setAppState('editing');
            runQualityCheck(processedDataUrl);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : t('errorImageProcess');
            setError(errorMessage);
            setAppState('idle');
        } finally {
            setLoadingMessage('');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
    };
    
    const handleGenerateClick = async () => {
        if (!sourceImage) return;
        setAppState('generating');
        setError(null);
        setGeneratedImage(null);
        setLoadingDetailMessage('');
        try {
            setLoadingMessage(t('analyzingMessage'));
            const faceBox = await callWorker('facebox', { imageDataUrl: sourceImage });
            
            setLoadingMessage(t('croppingMessage'));
            const croppedDataUrl = await cropImageToPassportFrame(sourceImage, faceBox);
            
            setLoadingMessage(t('generatingMessage'));
            setLoadingDetailMessage(t('generatingMessage_detail'));
            const finalBackgroundColor = backgroundColor === 'custom' ? customBackgroundColor : t(`bgColor_${backgroundColor}`);
            
            const result = await callWorker('generate', {
                imageDataUrl: croppedDataUrl,
                country,
                backgroundColor: finalBackgroundColor,
                outfit: OUTFITS[outfit],
                specs: countryPhotoSpecs[country]?.requirements,
                customOutfitImageUrl,
            });

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
        } finally {
            setLoadingMessage('');
            setLoadingDetailMessage('');
        }
    };
    
    const handleCustomOutfitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => { /* ... (Giữ nguyên) */ };
    const handleReset = () => { /* ... (Giữ nguyên) */ };
    const handleDownload = () => { /* ... (Giữ nguyên) */ };
    const handleHexColorChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... (Giữ nguyên) */ };

    const filteredCountries = COUNTRIES.filter(c => c.toLowerCase().includes(countrySearchQuery.toLowerCase()));
    const currentSpec = countryPhotoSpecs[country];
    const generatedPhotoAspectRatio = currentSpec ? currentSpec.aspectRatio : '1 / 1';

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countrySelectRef.current && !countrySelectRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    const CountrySelector = ({ isMobile = false }) => (
        <div className={isMobile ? 'text-center' : ''}>
            <label htmlFor="country-select" className="block text-lg font-semibold text-gray-700 mb-2">{t('countryLabel')}</label>
            <div className="relative" ref={countrySelectRef}>
                <button onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} className="w-full p-3 text-left bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex justify-between items-center">
                   <span className="flex items-center gap-3">
                       {COUNTRY_CODES[country] ? <span className={`fi fi-${COUNTRY_CODES[country]} text-2xl rounded-sm`}></span> : <span className="text-2xl">🌐</span>}
                       <span className="truncate">{country}</span>
                   </span>
                   <svg className={`w-5 h-5 text-gray-400 transition-transform ${isCountryDropdownOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
                <AnimatePresence>
                {isCountryDropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: isMobile ? 10 : -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: isMobile ? 10 : -10 }} className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg ${isMobile ? 'bottom-full mb-2' : ''}`}>
                        <div className="p-2">
                            <input type="text" placeholder={t('searchPlaceholder')} className="w-full p-2 border border-gray-200 rounded-md" value={countrySearchQuery} onChange={(e) => setCountrySearchQuery(e.target.value)} autoFocus />
                        </div>
                        <ul className="max-h-60 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map(c => (
                                    <li key={c} className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3" onClick={() => { setCountry(c); setIsCountryDropdownOpen(false); setCountrySearchQuery(''); activeModal && setActiveModal(null); }}>
                                        {COUNTRY_CODES[c] && <span className={`fi fi-${COUNTRY_CODES[c]} text-xl rounded-sm`}></span>}
                                        <span>{c}</span>
                                    </li>
                                ))
                            ) : ( <li className="px-4 py-3 text-gray-500 text-center">{t('noResultsFound')}</li> )}
                        </ul>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );
    
    const BackgroundSelector = ({ isMobilePanel = false }) => { /* ... (Giữ nguyên từ V2) */ };
    
    const OutfitSelector = ({ isMobilePanel = false }) => { /* ... (Giữ nguyên từ V2) */ };

return (
        <main className="bg-gray-100 text-gray-800 min-h-screen w-full flex flex-col items-center p-4 selection:bg-blue-200">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center flex-grow">
                 <header className="w-full flex justify-between items-center mb-4 md:mb-8">
                    <div className="text-center md:text-left flex-grow">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{t('mainTitle')}</h1>
                        <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">{t('subTitle')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {googleToken ? (
                            <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">Sign Out</button>
                        ) : (
                            <div id="googleSignInButton"></div>
                        )}
                        <LanguageSwitcher currentLang={lang} onChangeLang={setLang} onMobileClick={() => setActiveModal('language')} />
                    </div>
                </header>

                <AnimatePresence>
                {isApiKeyModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                            <h3 className="text-xl font-bold mb-2">Nhập Gemini API Key của bạn</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Key của bạn chỉ được lưu tạm thời trên trình duyệt. <br/>
                                <strong>Lấy API key nhanh tại: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">Google AI Studio</a></strong>
                            </p>
                            <input id="api-key-input" type="password" className="w-full p-2 border border-gray-300 rounded-md mb-4" placeholder="Dán API key vào đây" />
                            <div className="flex gap-3">
                                <button onClick={() => setApiKeyModalOpen(false)} className={secondaryButtonClasses}>Hủy</button>
                                <button onClick={handleApiKeySubmit} className={primaryButtonClasses}>Lưu Key</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.div key={appState} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full bg-white rounded-xl shadow-lg p-4 md:p-8">
                        {appState === 'idle' && (
                            // ... Dán JSX cho trạng thái 'idle' từ V2
                        )}

                        {appState === 'liveCapture' && (
                             <LiveCaptureView onCapture={(file) => processFile(file)} onCancel={() => setAppState('idle')} t={t} />
                        )}
                        
                        {appState === 'generating' && (
                             <div className="relative flex flex-col items-center justify-center py-16 min-h-[400px]">
                                <LoadingSpinner text={loadingMessage} detail={loadingDetailMessage} />
                            </div>
                        )}

                        {(appState === 'editing' || appState === 'done') && (
                            // ... Dán JSX cho trạng thái 'editing' và 'done' từ V2
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Dán tất cả các Modal và Footer từ V2 */}
            <AnimatePresence>
                {activeModal && ( <motion.div>...</motion.div> )}
            </AnimatePresence>
            <Footer t={t} />
            <GuideModal isOpen={isGuideModalOpen} onClose={() => setGuideModalOpen(false)} t={t} />
            <InfoModal isOpen={isInfoModalOpen} onClose={() => setInfoModalOpen(false)} t={t} />
            <PrintConfirmationModal isOpen={isPrintModalOpen} /* ... */ />
            <Lightbox isOpen={!!selectedLightboxImage} /* ... */ />
        </main>
    );
}

export default App;