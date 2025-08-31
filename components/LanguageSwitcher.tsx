/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { languageConfig } from '../translations';

interface LanguageSwitcherProps {
    currentLang: string;
    onChangeLang: (lang: string) => void;
    direction?: 'up' | 'down';
    onMobileClick?: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onChangeLang, direction = 'down', onMobileClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const switcherRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleButtonClick = () => {
        if (isMobile && onMobileClick) {
            onMobileClick();
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleLanguageChange = (lang: string) => {
        onChangeLang(lang);
        setIsOpen(false);
    };

    const currentLanguageDetails = languageConfig[currentLang];

    const dropdownClasses = direction === 'up'
        ? "absolute right-0 bottom-full mb-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl origin-bottom-right z-20 p-4"
        : "absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl origin-top-right z-20 p-4";

    return (
        <div className="relative" ref={switcherRef}>
            <button
                onClick={handleButtonClick}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
            >
                <span className={`fi fi-${currentLanguageDetails.code} text-xl rounded-sm`}></span>
                <span className="font-medium text-gray-700 hidden sm:inline">{currentLanguageDetails.name}</span>
                 <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen && !isMobile ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            <AnimatePresence>
                {!isMobile && isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: direction === 'up' ? 10 : -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: direction === 'up' ? 10 : -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={dropdownClasses}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 px-2">Language</h3>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {Object.entries(languageConfig).map(([langCode, { name, code }]) => (
                                <li key={langCode}>
                                    <button
                                        onClick={() => handleLanguageChange(langCode)}
                                        className={`w-full text-left flex items-center gap-3 px-2 py-2 text-gray-800 hover:bg-blue-50 rounded-md transition-colors ${currentLang === langCode ? 'font-semibold bg-blue-50' : ''}`}
                                    >
                                        <span className={`fi fi-${code} text-xl rounded-sm`}></span>
                                        <span>{name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;