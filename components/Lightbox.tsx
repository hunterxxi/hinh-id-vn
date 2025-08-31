

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl?: string;
    caption?: string;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, imageUrl, caption }) => {

    return (
        <AnimatePresence>
            {isOpen && imageUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col items-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute -top-12 -right-1 text-neutral-300 hover:text-white transition-colors z-10"
                            aria-label="Close image viewer"
                        >
                            <CloseIcon />
                        </button>
                        <img src={imageUrl} alt={caption || 'Enlarged view'} className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
                         {caption && (
                            <div className="mt-4 text-center">
                                <h3 className="font-semibold text-lg text-neutral-100">{caption}</h3>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;