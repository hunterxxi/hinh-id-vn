/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    t: (key: string) => string;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, t }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-sm bg-white rounded-lg shadow-xl flex flex-col p-6"
                    >
                        <header className="flex justify-between items-center pb-3 border-b">
                            <h2 className="text-xl font-bold text-gray-800">{t('appInfoTitle')}</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Close modal">
                                <CloseIcon />
                            </button>
                        </header>
                        
                        <div className="py-6 space-y-4 text-center">
                            <p className="text-gray-600">
                                {t('footerCredit.poweredBy')} | {t('footerCredit.createdBy')} <a href="https://www.linkedin.com/in/phanmanhkhang" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">@KhangTudo</a>
                            </p>
                            <a
                                href="https://aistudio.google.com/apps"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base font-semibold text-blue-600 hover:underline"
                            >
                                {t('aiStudioButton')}
                            </a>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InfoModal;