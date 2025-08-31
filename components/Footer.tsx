/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface FooterProps {
    t: (key: string) => string;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
    return (
        <footer className="hidden md:flex w-full max-w-6xl mx-auto py-6 mt-8 border-t border-gray-200 items-center justify-between">
            <p className="text-sm text-gray-500">
                {t('footerCredit.poweredBy')} | {t('footerCredit.createdBy')} <a href="https://www.khangtudo.id.vn/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">@KhangTudo</a>
            </p>
            <a
                href="https://aistudio.google.com/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-600 hover:underline"
            >
                {t('aiStudioButton')}
            </a>
        </footer>
    );
};

export default Footer;