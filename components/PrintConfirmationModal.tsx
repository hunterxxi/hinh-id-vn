/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrintConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onDecline: () => void;
    t: (key: string) => string;
}

const PrintConfirmationModal: React.FC<PrintConfirmationModalProps> = ({ isOpen, onClose, onConfirm, onDecline, t }) => {
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
                        className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 text-center"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('printModalTitle')}</h2>
                        <p className="text-gray-600 mb-6">{t('printModalContent')}</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={onConfirm} className="w-full text-lg font-semibold text-white bg-red-600 py-3 px-6 rounded-lg shadow-sm transform transition-all duration-300 hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                {t('printModalConfirmButton')}
                            </button>
                            <button onClick={onDecline} className="w-full text-lg font-semibold text-gray-700 bg-gray-200 py-3 px-6 rounded-lg transform transition-all duration-300 hover:bg-gray-300 hover:scale-105">
                                {t('printModalDeclineButton')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PrintConfirmationModal;