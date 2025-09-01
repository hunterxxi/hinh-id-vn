/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// Configuration for language names and flags
export const languageConfig: Record<string, { name: string; code: string }> = {
    en: { name: 'English', code: 'gb' },
    vi: { name: 'Tiếng Việt', code: 'vn' },
    id: { name: 'Bahasa Indonesia', code: 'id' },
    pt: { name: 'Português', code: 'pt' },
    ms: { name: 'Bahasa Malaysia', code: 'my' },
    cs: { name: 'Čeština', code: 'cz' },
    es: { name: 'Español', code: 'es' },
    fr: { name: 'Français', code: 'fr' },
    de: { name: 'Deutsch', code: 'de' },
    el: { name: 'Ελληνικά', code: 'gr' },
    hu: { name: 'Magyar', code: 'hu' },
    it: { name: 'Italiano', code: 'it' },
    nl: { name: 'Nederlands', code: 'nl' },
    th: { name: 'ไทย', code: 'th' },
    tr: { name: 'Türkçe', code: 'tr' },
    uk: { name: 'Українська', code: 'ua' },
    ru: { name: 'Русский', code: 'ru' },
    ko: { name: '한국어', code: 'kr' },
    ja: { name: '日本語', code: 'jp' },
    ar: { name: 'العربية', code: 'sa' },
    'zh-CN': { name: '简体中文', code: 'cn' },
    'zh-TW': { name: '繁體中文', code: 'tw' },
};

const enTranslations = {
    // Header
    mainTitle: "AI ID Photo Generator",
    subTitle: "Create official passport, visa, and ID photos in seconds.",
    appInfoButton: "App Info",
    appInfoTitle: "App Information",

     // GG Login
    signOut: "Sign Out",
    apiKeyModal: {
        title: "Enter Your Gemini API Key",
        description: "Your key is stored only in your browser for this session and is not saved on our servers.",
        linkText: "Get your API key quickly from Google AI Studio",
        placeholder: "Paste your API key here",
        cancel: "Cancel",
        save: "Save Key"
    }

    // Idle/Upload State
    uploadTitle: "Upload Your Photo",
    uploadSubtitle: "Drag & drop an image or click to select a file.",
    useCamera: "Use Camera",

    // Live Capture
    capture: {
        feedback_none: "Position your face and shoulders within the guide",
        button: "Take Photo",
    },
    
    // Editing State
    originalPhotoTitle: "Your Photo",
    originalPhotoAlt: "Your uploaded photo",
    generatedPhotoTitle: "AI Generated Photo",
    generatedPhotoAlt: "AI generated ID photo",
    placeholderGenerated: "Your result will appear here",
    customOutfitAlt: "Custom outfit preview",

    // Controls
    countryLabel: "Country for Visa/Passport",
    searchPlaceholder: "Search for a country...",
    noResultsFound: "No countries found",
    backgroundLabel: "Background Color",
    bgColor_white: "White",
    bgColor_lightGrey: "Light Grey",
    bgColor_blue: "Blue",
    bgColor_red: "Red",
    bgColor_custom: "Custom",
    hexCodeLabel: "Hex Code",
    outfitLabel: "Outfit",
    outfit_keep: "Keep Original",
    outfit_suit_male: "Men's Suit",
    outfit_suit_female: "Women's Suit",
    outfit_ao_dai_female: "Ao Dai",
    outfit_biz_cas_male: "Men's Business Casual",
    outfit_biz_cas_female: "Women's Business Casual",
    outfit_shirt_male: "Men's White Shirt",
    outfit_shirt_female: "Women's White Shirt",
    outfit_sari_female: "Sari (Traditional)",
    outfit_kimono_female: "Kimono (Traditional)",
    outfit_pilot: "Pilot",
    outfit_flight_attendant: "Flight Attendant",
    outfit_doctor: "Doctor",
    outfit_engineer: "Engineer",
    outfit_architect: "Architect",
    outfit_teacher: "Teacher",
    outfit_custom: "Custom",
    removeCustomOutfit: "Remove custom outfit",
    outfitCategory_general: "General",
    outfitCategory_male: "Male Attire",
    outfitCategory_female: "Female Attire",
    outfitCategory_professional: "Professional Uniforms",
    languageSwitcherTitle: "Language",

    // Buttons & Status
    generateButton: "Generate Photo",
    generatingButton: "Generating...",
    regenerateButton: "Re-generate",
    generatingMessage: "Step 3/3: Creating your final photo...",
    generatingMessage_detail: "This can take up to a minute as the AI applies the new background, outfit, and official dimensions.",
    processingMessage: "Processing your image...",
    analyzingMessage: "Step 1/3: Analyzing photo...",
    croppingMessage: "Step 2/3: Preparing image for AI...",
    downloadButton: "Download Photo",
    printOnlineButton: "Print Online by Minh Tâm Prolab",
    resetButton: "Start Over",

    // AI Quality Check
    qualityCheck: {
        title: "Photo Quality Report",
        analyzing: "Analyzing photo quality...",
        success: "Photo quality looks good!",
        success_advice: "This photo is a great starting point for AI generation.",
        issuesFound: "Quality issues found.",
        showDetails: "Details",
        hideDetails: "Hide",
        warning_blurry: "Photo may be blurry.",
        advice_blurry: "Try holding the camera steady and shooting in better light for a sharper image.",
        warning_lighting: "Poor lighting detected.",
        advice_lighting: "Face the light source and avoid harsh shadows or bright spots on your face.",
        warning_expression: "Expression is not neutral.",
        advice_expression: "Look directly at the camera with your eyes open and mouth closed.",
        warning_obstruction: "Face may be obstructed.",
        advice_obstruction: "Ensure your hair or other objects are not covering your face or eyes.",
        warning_tilt: "Head appears to be tilted.",
        advice_tilt: "Keep your head level and centered when taking the photo."
    },

    // Print Confirmation Modal
    printModalTitle: "Are you located in Vietnam?",
    printModalContent: "This is an experimental feature, currently available only to customers living or working in Vietnam. Support for other countries will be added in a future update. Thanks for your understanding!",
    printModalConfirmButton: "Yes, I Need to Print",
    printModalDeclineButton: "No, I'm Not in Vietnam",

    // Errors
    errorInvalidFileType: "Invalid file type. Please upload an image.",
    errorImageLoad: "Could not load the image. Please try another file.",
    errorImageProcess: "Could not process the image. The file may be corrupt. Please try another.",
    
    // Footer / Info Modal
    aiStudioButton: "APPS ON AI STUDIO",
    footerCredit: {
        poweredBy: "Powered by Gemini",
        createdBy: "Created by"
    },

    // Photo Guide
    photoGuide: {
        openButton: "View Photo Guide",
        prompt: "For best results, ",
        title: "Photo Guide",
        noteTitle: "Note",
        noteContent: "If the photo experience in our app isn't good enough, please take a photo according to the instructions below and upload it directly to this app.",
        howToTitle: "How to Take a Standard Passport Photo at Home",
        howToSubtitle: "The original photo is crucial. Here are some basic instructions.",
        equipmentTitle: "Equipment",
        equipmentContent: "A smartphone or digital camera with a resolution of about 5MP or higher. Mount the camera on a tripod and choose a suitable sitting position opposite the camera. The camera should be placed about 1.5 - 2 meters from your face. Make sure the upper part of your body and both shoulders appear in the frame. Take several test shots, varying the distance, to find the most suitable one.",
        backgroundTitle: "Background",
        backgroundContent: "Choose a solid-colored background that does not match your clothing color. Use a white cloth to create a background or simply use a plain wall in your room.",
        lightingTitle: "Lighting, Flash",
        lightingContent: "Lighting is a crucial factor to get the desired photo. Ideally, you should take photos in well-lit conditions. Avoid shadows and glare on the face. The face must be evenly lit. Use a flash if the lighting conditions are too poor, or if there are shadows on the face.",
        attireTitle: "Attire",
        attireContent: "Choose appropriate attire that contrasts with the background color. Do not wear t-shirts.",
        glassesTitle: "Glasses",
        glassesContent: "US Passport or Visa: eyeglasses are not allowed. Avoid wearing glasses when taking photos. If you cannot take them off, make sure they are not too dark or colored, and that there is no glare. Eyes must be wide open.",
        hairTitle: "Hair",
        hairContent: "Do not dye your hair or wear jewelry. Tie your hair back neatly so that your forehead and both ears are visible.",
        faceTitle: "Face",
        faceContent: "The person being photographed must look straight at the camera. A neutral facial expression (no smiling or frowning), mouth closed, and eyes open. Only light makeup is recommended.",
        photoAgeTitle: "Photo Age",
        photoAgeContent: "The photo must be recent, taken within the last 6 months, to reflect your current appearance.",
        editingTitle: "No Editing",
        editingContent: "Do not edit your photo with any software before uploading it to our service.",
        examplesTitle: "Incorrect Passport Photo Examples to Avoid",
        examples: {
            shadows: "Shadows on Face",
            hair: "Hair Obscuring Face",
            glasses: "Glasses & Hats",
            expression: "Unnatural Expression",
            background: "Incorrect Background",
            focus: "Out of Focus / Blurry",
            glare: "Glare on Skin/Glasses"
        }
    }
};

// All UI translations
export const translations: Record<string, Record<string, any>> = {
    en: enTranslations,
    vi: {
        mainTitle: "Trình tạo ảnh ID bằng AI",
        subTitle: "Tạo ảnh hộ chiếu, visa và ảnh ID chính thức trong vài giây.",
        appInfoButton: "Thông tin",
        appInfoTitle: "Thông tin ứng dụng",
        uploadTitle: "Tải ảnh của bạn lên",
        uploadSubtitle: "Kéo và thả ảnh hoặc nhấp để chọn tệp.",
        useCamera: "Dùng máy ảnh",
        capture: {
            feedback_none: "Căn chỉnh mặt và vai của bạn vào trong khung",
            button: "Chụp ảnh",
        },
        // GG Login
        signOut: "Đăng xuất",
        apiKeyModal: {
            title: "Nhập Gemini API Key của bạn",
            description: "Key của bạn chỉ được lưu tạm thời trên trình duyệt và không được lưu trên máy chủ của chúng tôi.",
            linkText: "Lấy API key nhanh tại Google AI Studio",
            placeholder: "Dán API key của bạn vào đây",
            cancel: "Hủy",
            save: "Lưu Key"
        }
        originalPhotoTitle: "Ảnh của bạn",
        originalPhotoAlt: "Ảnh bạn đã tải lên",
        generatedPhotoTitle: "Ảnh do AI tạo",
        generatedPhotoAlt: "Ảnh ID do AI tạo",
        placeholderGenerated: "Kết quả sẽ xuất hiện ở đây",
        customOutfitAlt: "Xem trước trang phục tùy chỉnh",
        countryLabel: "Quốc gia làm Visa/Hộ chiếu",
        searchPlaceholder: "Tìm kiếm quốc gia...",
        noResultsFound: "Không tìm thấy quốc gia nào",
        backgroundLabel: "Màu nền",
        bgColor_white: "Trắng",
        bgColor_lightGrey: "Xám nhạt",
        bgColor_blue: "Xanh dương",
        bgColor_red: "Đỏ",
        bgColor_custom: "Tùy chỉnh",
        hexCodeLabel: "Mã Hex",
        outfitLabel: "Trang phục",
        outfit_keep: "Giữ nguyên gốc",
        outfit_suit_male: "Vest nam",
        outfit_suit_female: "Vest nữ",
        outfit_ao_dai_female: "Áo dài",
        outfit_biz_cas_male: "Công sở nam",
        outfit_biz_cas_female: "Công sở nữ",
        outfit_shirt_male: "Áo sơ mi trắng nam",
        outfit_shirt_female: "Áo sơ mi trắng nữ",
        outfit_sari_female: "Sari (Truyền thống)",
        outfit_kimono_female: "Kimono (Truyền thống)",
        outfit_pilot: "Phi công",
        outfit_flight_attendant: "Tiếp viên hàng không",
        outfit_doctor: "Bác sĩ",
        outfit_engineer: "Kỹ sư",
        outfit_architect: "Kiến trúc sư",
        outfit_teacher: "Giáo viên",
        outfit_custom: "Tùy chỉnh",
        removeCustomOutfit: "Xóa trang phục tùy chỉnh",
        outfitCategory_general: "Chung",
        outfitCategory_male: "Trang phục nam",
        outfitCategory_female: "Trang phục nữ",
        outfitCategory_professional: "Đồng phục chuyên nghiệp",
        languageSwitcherTitle: "Ngôn ngữ",
        generateButton: "Tạo ảnh",
        generatingButton: "Đang tạo...",
        regenerateButton: "Tạo lại",
        generatingMessage: "Bước 3/3: Đang tạo ảnh cuối cùng...",
        generatingMessage_detail: "Quá trình này có thể mất đến một phút vì AI cần áp dụng nền mới, trang phục và các kích thước chính thức.",
        processingMessage: "Đang xử lý ảnh của bạn...",
        analyzingMessage: "Bước 1/3: Đang phân tích ảnh...",
        croppingMessage: "Bước 2/3: Chuẩn bị ảnh cho AI...",
        downloadButton: "Tải ảnh xuống",
        printOnlineButton: "In ảnh Online bởi Minh Tâm Prolab",
        resetButton: "Làm lại từ đầu",
        qualityCheck: {
            title: "Báo cáo chất lượng ảnh",
            analyzing: "Đang phân tích chất lượng ảnh...",
            success: "Chất lượng ảnh có vẻ tốt!",
            success_advice: "Bức ảnh này là một khởi đầu tuyệt vời cho việc tạo ảnh bằng AI.",
            issuesFound: "Phát hiện vấn đề chất lượng.",
            showDetails: "Chi tiết",
            hideDetails: "Ẩn",
            warning_blurry: "Ảnh có thể bị mờ.",
            advice_blurry: "Hãy giữ máy ảnh ổn định và chụp ở nơi có ánh sáng tốt hơn để có ảnh sắc nét hơn.",
            warning_lighting: "Phát hiện ánh sáng kém.",
            advice_lighting: "Hãy hướng mặt về phía nguồn sáng và tránh bóng đổ gay gắt hoặc các điểm sáng trên mặt.",
            warning_expression: "Biểu cảm không trung tính.",
            advice_expression: "Nhìn thẳng vào máy ảnh, mắt mở và miệng ngậm.",
            warning_obstruction: "Khuôn mặt có thể bị che khuất.",
            advice_obstruction: "Đảm bảo tóc hoặc các vật thể khác không che mặt hoặc mắt của bạn.",
            warning_tilt: "Đầu có vẻ bị nghiêng.",
            advice_tilt: "Giữ đầu thẳng và ở giữa khi chụp ảnh."
        },
        printModalTitle: "Bạn có đang ở Việt Nam không?",
        printModalContent: "Đây là một tính năng thử nghiệm, hiện chỉ dành cho khách hàng sinh sống hoặc làm việc tại Việt Nam. Hỗ trợ cho các quốc gia khác sẽ được bổ sung trong bản cập nhật tương lai. Cảm ơn sự thông cảm của bạn!",
        printModalConfirmButton: "Có, Tôi cần In",
        printModalDeclineButton: "Không, tôi không ở Việt Nam",
        errorInvalidFileType: "Loại tệp không hợp lệ. Vui lòng tải lên tệp ảnh.",
        errorImageLoad: "Không thể tải ảnh. Vui lòng thử một tệp khác.",
        errorImageProcess: "Không thể xử lý ảnh. Tệp có thể bị hỏng. Vui lòng thử ảnh khác.",
        aiStudioButton: "ỨNG DỤNG TRÊN AI STUDIO",
        footerCredit: {
            poweredBy: "Phát triển bởi Gemini",
            createdBy: "Tạo bởi"
        },
        photoGuide: {
            openButton: "Xem hướng dẫn",
            prompt: "Để có kết quả tốt nhất, ",
            title: "Hướng dẫn sử dụng",
            noteTitle: "Lưu ý",
            noteContent: "Nếu trải nghiệm chụp ảnh trên ứng dụng của chúng tôi chưa đủ tốt, bạn hãy chụp ảnh theo hướng dẫn dưới đây và tải ảnh trực tiếp lên ứng dụng này.",
            howToTitle: "Làm sao để chụp Ảnh Hộ Chiếu tại Nhà Chuẩn",
            howToSubtitle: "Ảnh chụp gốc đóng vai trò quyết định. Sau đây là một số hướng dẫn cơ bản.",
            equipmentTitle: "Dụng cụ",
            equipmentContent: "Điện thoại thông minh hoặc một máy ảnh kỹ thuật số với độ phân giải khoảng 5MP hay lớn hơn. Gắn camera lên chân máy và chọn một vị trí ngồi thích hợp đối diện camera. Nên đặt máy ở khoảng 1.5 - 2 mét từ khuôn mặt. Hãy chắc rằng phần trên của cơ thể và hai vai xuất hiện trong khuôn hình. Chụp thử nhiều ảnh khi thay đổi khoảng cách chọn ra ảnh phù hợp nhất.",
            backgroundTitle: "Màu nền",
            backgroundContent: "Nên chọn phông nền một màu và không trùng với màu áo. Sử dụng một tấm vải trắng để làm phông nền hoặc đơn giản hơn là sử dụng ngay bức tường phòng bạn.",
            lightingTitle: "Ánh sáng, Đèn Flash",
            lightingContent: "Ánh sáng là một yếu tố quan trọng để có được bức ảnh như mong đợi. Trường hợp lý tưởng là bạn có thể chụp ảnh ở điều kiện đủ sáng. Tránh các bóng đen và loá sáng trên khuôn mặt. Khuôn mặt phải sáng đều. Dùng đèn flash nếu điều kiện ánh sáng quá tệ, hoặc nếu có bóng khuất trên khuôn mặt.",
            attireTitle: "Trang phục",
            attireContent: "Lựa chọn trang phục phù hợp cần tạo sự tương phản với màu nền. Không nên mặc áo thun.",
            glassesTitle: "Kính",
            glassesContent: "Hộ chiếu Mỹ hay Visa: không được phép đeo mắt kính. Cần tránh đeo mắt kính khi chụp ảnh. Nếu bạn không thể tháo kính ra, hãy chắc chắn rằng chúng không quá tối hay có màu, đồng thời không bị loá. Mắt phải mở to.",
            hairTitle: "Tóc",
            hairContent: "Không nên nhuộm màu hoặc đeo trang sức, vén tóc gọn gàng sao cho thấy trán và hai bên tai.",
            faceTitle: "Khuôn mặt",
            faceContent: "Người được chụp phải nhìn thẳng về phía máy ảnh. Biểu cảm khuôn mặt trung tính (không cười hay nhăn mặt), khép miệng, và mắt mở. Chỉ nên trang điểm nhẹ nhàng.",
            photoAgeTitle: "Tuổi Ảnh",
            photoAgeContent: "Ảnh phải được chụp gần đây, trong vòng 6 tháng qua, để phản ánh đúng diện mạo hiện tại của bạn.",
            editingTitle: "Không chỉnh sửa",
            editingContent: "Không nên chỉnh sửa hình của bạn với bất kỳ phần mềm nào trước khi tải lên dịch vụ của chúng tôi.",
            examplesTitle: "Minh họa ảnh hộ chiếu sai cần tránh",
            examples: {
                shadows: "Bóng trên mặt",
                hair: "Tóc che mặt",
                glasses: "Kính & Mũ",
                expression: "Biểu cảm không tự nhiên",
                background: "Nền không đúng",
                focus: "Mất nét / Mờ",
                glare: "Lóa trên da/kính"
            }
        }
    },
    id: {
        ...enTranslations, 
        languageSwitcherTitle: "Bahasa",
    },
    pt: {
        ...enTranslations, 
        languageSwitcherTitle: "Língua",
    },
    ms: {
        ...enTranslations, 
        languageSwitcherTitle: "Bahasa",
    },
    cs: {
        ...enTranslations, 
        languageSwitcherTitle: "Jazyk",
    },
    es: {
        ...enTranslations, 
        languageSwitcherTitle: "Idioma",
    },
    fr: {
        ...enTranslations, 
        languageSwitcherTitle: "Langue",
    },
    de: {
        ...enTranslations, 
        languageSwitcherTitle: "Sprache",
    },
    el: {
        ...enTranslations, 
        languageSwitcherTitle: "Γλώσσα",
    },
    hu: {
        ...enTranslations, 
        languageSwitcherTitle: "Nyelv",
    },
    it: {
        ...enTranslations, 
        languageSwitcherTitle: "Lingua",
    },
    nl: {
        ...enTranslations, 
        languageSwitcherTitle: "Taal",
    },
    th: {
        ...enTranslations, 
        languageSwitcherTitle: "ภาษา",
    },
    tr: {
        ...enTranslations, 
        languageSwitcherTitle: "Dil",
    },
    uk: {
        ...enTranslations, 
        languageSwitcherTitle: "Мова",
    },
    ru: {
        ...enTranslations, 
        languageSwitcherTitle: "Язык",
    },
    ko: {
        ...enTranslations, 
        languageSwitcherTitle: "언어",
    },
    ja: {
        ...enTranslations, 
        languageSwitcherTitle: "言語",
    },
    ar: {
        ...enTranslations, 
        languageSwitcherTitle: "اللغة",
    },
    'zh-CN': {
        ...enTranslations, 
        languageSwitcherTitle: "语言",
    },
    'zh-TW': {
        ...enTranslations, 
        languageSwitcherTitle: "語言",
    }
};