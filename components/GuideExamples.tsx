/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface GuideExamplesProps {
    t: (key: string) => string;
}

const TickIcon = () => (
    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M2 14l8 8L22 4" />
    </svg>
);

const CrossIcon = () => (
    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M2 22L22 2M2 2l20 20" />
    </svg>
);

// Data structure for the hosted image URLs
const exampleImages: Record<string, { incorrect1: string; incorrect2: string; correct: string; }> = {
    shadows: {
        incorrect1: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcsfxwWSiP0RqnT9_j4rtAhvbziBsjlNeojQw2nOgNCJZfxhjDE2vu0xdox0b5eox8y9egKKaWN-APUuyGmrMqxswG2akRzsewFleYgtJ9ZOixTdHrsYJxplJDzTJpOqxsdVvQKsHQjfSJWb7_CumQQicM_85OuiIYIhN5M4TVXo2yxHC6-BRLNSypMfvd/s2048/Shadows%20on%20face.png',
        incorrect2: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrRVe_YZ4HQe5oGizVY6tTVUQ7GMC6vl9m2ArHKMe2YbdFX0ypGmivZhK4MjYc1HnZWtBsecrKPb7KfA2fdN9qcOGkXJ_u5Y2JlQ-jqaAbbgI2HisvoG0ChnT-hKUJuAtvIrtlVNqzAWNykDTUVk62wPcCiRpqK7Rs1rDOnYmBGqfj46ddn9dS6bH9bYfj/s2048/Overexposed.png',
        correct: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKeyJ7V5WnQNZWVE_l7HXigGL0K8PkGcbuAWF_WQDteMp0vyYB6DyHCClYkBN-YQABS7Z4yEGgHCLA6II-X4yXM0ETRRJwMRqkAEG-fIWn0FYnzNQAsMRkXv0DekTabGNVFPfIhiBeVkQ0K8F06CtOX5PHb1yLbBEesYft-xP0OL7icl7uzkL4JdtEBzIn/s2048/The%20best%20pose.png',
    },
    hair: {
        incorrect1: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcx14THds2DOe2JbGXlP_1QphyAXIAb2ZgMLm3BYrf4gRQ5Ci7Hfj35MJo3dzOmXhl-kS7R4GFX9rNl8LjfNpgkGRYxyaUp3xNb1vJU0UFzeV_lnC2tB57imJxBVWbqatgznKO53vEgtX8zjOQy5MCVxmmZ8fuOrSGi_G_qUg0d1YJetfu5-qAPMvHIAzt/s2048/Hair%20covering%20eyes.png',
        incorrect2: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdyAZQMNcb-GMiewrGZa444YHr6-0PhGA3UFIq_Nel5nbjJAhxLHwctTosoD0DJMyxMJhHb21uURwFn7CL4nqGhShoxCHf98pXH9dHNw2zPzE42hwqZZP7Z39VPevVDMfshHw5hWoHIsHKwt0pqgu_X-TSL6VaSTfz6Iny6J6AQb3rhHlWq1DvQox2Psl_/s2048/Eyes%20closed.png',
        correct: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKeyJ7V5WnQNZWVE_l7HXigGL0K8PkGcbuAWF_WQDteMp0vyYB6DyHCClYkBN-YQABS7Z4yEGgHCLA6II-X4yXM0ETRRJwMRqkAEG-fIWn0FYnzNQAsMRkXv0DekTabGNVFPfIhiBeVkQ0K8F06CtOX5PHb1yLbBEesYft-xP0OL7icl7uzkL4JdtEBzIn/s2048/The%20best%20pose.png',
    },
    glasses: {
        incorrect1: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDfY7YBoseabCGQLeLRZ7tDmVu41ve-ppdOkQ34dNEO2OnRwA_jHGksVKJHdITH0xqNGR-zFT2ptPJXgNFgNBbljg47gN80tyugq2_LL_P_wMBta2dN0jF-TI0MqeqWBWUUnpG3YtEHPhQZ8-88bqhSh4qD_TMZFP-HiZxX96AMEiPggeBtLqG2kUTjbnD/s2048/Wearing%20glasses.png',
        incorrect2: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2G3TLgSQ5mJ2VJweUDFp5BbpnBV5n2GfVEOE6Bmju30Lza0bxI6uoRHBPddFfAHjMF8C2ndiJScrw3DYby-qU0AnJMo-zSiLvpJ4DV632DbR2fWdTsMWXF27_5PxZcX6stuHiY61frTqWUoSnBAs_pRrhRxjOPjtqNCatmZvO0iEtKISWrfbwD0VNFbqq/s2048/Wearing%20a%20hat.png',
        correct: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKeyJ7V5WnQNZWVE_l7HXigGL0K8PkGcbuAWF_WQDteMp0vyYB6DyHCClYkBN-YQABS7Z4yEGgHCLA6II-X4yXM0ETRRJwMRqkAEG-fIWn0FYnzNQAsMRkXv0DekTabGNVFPfIhiBeVkQ0K8F06CtOX5PHb1yLbBEesYft-xP0OL7icl7uzkL4JdtEBzIn/s2048/The%20best%20pose.png',
    },
    expression: {
        incorrect1: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_whTvVOpy2B2CwoK3jPDjoIT3QSoVHkSLMIayfBr4lGn3isD3Yn58wgtGdQ9y1vM9GZ4kPB14BuL_o529sAYbFgcbHIjuslU6U5OGnG0M8UyNhWjLucFszPgTl3zmH7os3HwzVk73zWOQcCu8jgOE2OIrfwpJX79sB-smbwnysyIkmROjtQopDi6-YHZF/s2048/Portrait%20poses.png',
        incorrect2: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVWO6tDaj2m7Dm128pIdyIEvRUaf_wnqh_2nq6QegK7GaGj1EUgTG45AxMhrJGa44Hz_KSaEyESXAHAOqsuMBjbIJTthxjUuGskcn12RULqWn5Td7wMl90fxQK-PFr_rLP5vbfIzea6kpIoVrjYGQZmwYvzXVoOWIbI2erxx4_xSzcncSExxvv1P831sTC/s2048/Looking%20away.png',
        correct: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKeyJ7V5WnQNZWVE_l7HXigGL0K8PkGcbuAWF_WQDteMp0vyYB6DyHCClYkBN-YQABS7Z4yEGgHCLA6II-X4yXM0ETRRJwMRqkAEG-fIWn0FYnzNQAsMRkXv0DekTabGNVFPfIhiBeVkQ0K8F06CtOX5PHb1yLbBEesYft-xP0OL7icl7uzkL4JdtEBzIn/s2048/The%20best%20pose.png',
    },
    background: {
        incorrect1: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigxnisJULFJqZqOELuaRtY73vPsNdDAud4EvTnnKePqp_C9wLgBsGgtT3FmPzMqehnlxoyAZ1TH6th-hTGkECnjUxLKrcM3orG88jrXpEYvBNusL_NRY1KjFHb2xNQ96M_OyW-6lYRjI9uK4qwZteFrpcKII0Bywwi9MpuHcrUyRvNMe73_3_qFKHkGa_-/s2048/Background%20shadow%20too%20much.png',
        incorrect2: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgLWuksaW6DFCdwU_jeeNCltGutcFxsKV7WuNklSJink729v3TH48CB2bXB4434zoIWFAqpELcv4at_9YA3Hrkfb1aep1OMD6gzRTSkFQyXgTQycfS46TqqFH08lIYMzJNin900x0NvUURI78K8q0vJIhA-5H1bBUWC17yOhVu697RBFYu8lCTUZaSFIaZg/s2048/Too%20dark.png',
        correct: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKeyJ7V5WnQNZWVE_l7HXigGL0K8PkGcbuAWF_WQDteMp0vyYB6DyHCClYkBN-YQABS7Z4yEGgHCLA6II-X4yXM0ETRRJwMRqkAEG-fIWn0FYnzNQAsMRkXv0DekTabGNVFPfIhiBeVkQ0K8F06CtOX5PHb1yLbBEesYft-xP0OL7icl7uzkL4JdtEBzIn/s2048/The%20best%20pose.png',
    },
    focus: {
        incorrect1: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhURLMT3AyUML9oJ0aCRC1ZhlyAypA1BSZLqZIKA1VtSGYuDGiL2NlrReUlcLIbxV0LjM0fZuUhgxw3-qAQ1rKMylRtfSM_AAcRk3ogsRdCkJpqcFLJpoijG1CXwzDtpNOLhhMrXdBgvfKTL_Ebx-pqjyNeerC87nTkZyn9Es2dtQE7hMmcuR2Cqtsqdt0y/s2048/Pixelated.png',
        incorrect2: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEij877z5eNXJ3JUiJMtBxxQ1sRcagPKJoeNYl4zb0LkFGlOkuQiZS-thlnWcRaIinJ5gu2CI22l4Ni-4LvX8Lu2CqpUP6FZD9igQUr6oYujDzcEwDgZjILyw8VQnXXaUp_7-FrLeDcq-wXKqCw8NIuquKyN2Y57Bo0bhU5huxx2D5zBLVDJpyMzgC_wCazA/s2048/Blurry.png',
        correct: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKeyJ7V5WnQNZWVE_l7HXigGL0K8PkGcbuAWF_WQDteMp0vyYB6DyHCClYkBN-YQABS7Z4yEGgHCLA6II-X4yXM0ETRRJwMRqkAEG-fIWn0FYnzNQAsMRkXv0DekTabGNVFPfIhiBeVkQ0K8F06CtOX5PHb1yLbBEesYft-xP0OL7icl7uzkL4JdtEBzIn/s2048/The%20best%20pose.png',
    },
    glare: {
        incorrect1: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTOrP2-rYjRQC1tKAkMBetf_nRM-XMqeiStfaXMJGA_dSgsj2_0ln_Vk3iRgyq75NhuirQ8uXg4GgzeajbOOAPJECSRbkTvnLg_poxC1NNH0vioa12_nwd04YCCGFIbyP-IB9bRrKJYeroja_yWMIsYc_q-ncVC1qApRV60cc9IjxZ2Wi37yeeOkCBUrtG/s2048/Unnatural%20skin%20tone.png',
        incorrect2: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhrTWYCUNrRohu3Z8udsPTh79Zf4hH0JhWXUQlYMNyVmmcKGEpt3iiUiKJp090-jgXgYGP16QMQ__FxaMVj_7wKOX8GLvLQX_8ueIgF6HKDBkFiY6kUmvz2rDagtuQR2e6Fjv7bAjKSo3YV8xfXE2XbVoBTkzavyq2_B9QU3P5s2HdxroXUSogaM5lXmwoR/s2048/Faded%20color.png',
        correct: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKeyJ7V5WnQNZWVE_l7HXigGL0K8PkGcbuAWF_WQDteMp0vyYB6DyHCClYkBN-YQABS7Z4yEGgHCLA6II-X4yXM0ETRRJwMRqkAEG-fIWn0FYnzNQAsMRkXv0DekTabGNVFPfIhiBeVkQ0K8F06CtOX5PHb1yLbBEesYft-xP0OL7icl7uzkL4JdtEBzIn/s2048/The%20best%20pose.png',
    },
};


const GuideExamples: React.FC<GuideExamplesProps> = ({ t }) => {
    const exampleKeys = [
        'shadows',
        'hair',
        'glasses',
        'expression',
        'background',
        'focus',
        'glare',
    ] as const; // Use 'as const' to give a more specific type

    const ImageBox = ({ type, imageUrl }: { type: 'correct' | 'incorrect', imageUrl: string }) => (
        <div className="relative">
            <img 
                src={imageUrl} 
                alt={`${type} example`} 
                className="w-full h-auto object-cover rounded-md bg-gray-200 border" 
            />
            <div className={`absolute bottom-0 right-0 w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${type === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
                {type === 'correct' ? <TickIcon /> : <CrossIcon />}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {exampleKeys.map(key => {
                const urls = exampleImages[key];
                if (!urls) return null; // Safety check

                return (
                    <div key={key}>
                        <h5 className="font-semibold text-gray-700 mb-3">{t(`photoGuide.examples.${key}`)}</h5>
                        <div className="grid grid-cols-3 gap-3">
                            <ImageBox type="incorrect" imageUrl={urls.incorrect1} />
                            <ImageBox type="incorrect" imageUrl={urls.incorrect2} />
                            <ImageBox type="correct" imageUrl={urls.correct} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GuideExamples;