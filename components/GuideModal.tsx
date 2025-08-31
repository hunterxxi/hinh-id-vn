/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuideExamples from './GuideExamples';

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    t: (key: string) => string;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, t }) => {
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
                        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col"
                    >
                        <header className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">{t('photoGuide.title')}</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Close guide">
                                <CloseIcon />
                            </button>
                        </header>
                        
                        <div className="p-6 overflow-y-auto space-y-6">
                            <div className="prose prose-sm max-w-none">
                                <h3 className="text-red-600 font-semibold">{t('photoGuide.noteTitle')}</h3>
                                <p>{t('photoGuide.noteContent')}</p>

                                <h3 className="text-blue-600 font-semibold">{t('photoGuide.howToTitle')}</h3>
                                <p>{t('photoGuide.howToSubtitle')}</p>
                                
                                <h4 className="font-semibold">{t('photoGuide.equipmentTitle')}</h4>
                                <p>{t('photoGuide.equipmentContent')}</p>

                                <h4 className="font-semibold">{t('photoGuide.backgroundTitle')}</h4>
                                <p>{t('photoGuide.backgroundContent')}</p>

                                <h4 className="font-semibold">{t('photoGuide.lightingTitle')}</h4>
                                <p>{t('photoGuide.lightingContent')}</p>

                                <h4 className="font-semibold">{t('photoGuide.attireTitle')}</h4>
                                <p>{t('photoGuide.attireContent')}</p>

                                <h4 className="font-semibold">{t('photoGuide.glassesTitle')}</h4>
                                <p>{t('photoGuide.glassesContent')}</p>
                                
                                <h4 className="font-semibold">{t('photoGuide.hairTitle')}</h4>
                                <p>{t('photoGuide.hairContent')}</p>

                                <h4 className="font-semibold">{t('photoGuide.faceTitle')}</h4>
                                <p>{t('photoGuide.faceContent')}</p>

                                <h4 className="font-semibold">{t('photoGuide.photoAgeTitle')}</h4>
                                <p>{t('photoGuide.photoAgeContent')}</p>

                                <h4 className="font-semibold">{t('photoGuide.editingTitle')}</h4>
                                <p>{t('photoGuide.editingContent')}</p>
                            </div>

                            <div>
                                <h3 className="text-blue-600 font-semibold mb-4">{t('photoGuide.examplesTitle')}</h3>
                                <GuideExamples t={t} />
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GuideModal;