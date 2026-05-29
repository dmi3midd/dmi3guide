import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const toggleLanguage = () => {
    // Handle cases like 'uk-UA' or just 'uk'
    const nextLang = currentLanguage.startsWith('uk') ? 'en' : 'uk';
    i18n.changeLanguage(nextLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '6px 12px',
        color: 'var(--text-main)',
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'background-color 0.2s, border-color 0.2s',
        userSelect: 'none',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      <span style={{ opacity: currentLanguage.startsWith('uk') ? 1 : 0.4, transition: 'opacity 0.2s' }}>УКР</span>
      <span style={{ color: 'var(--text-secondary)', opacity: 0.5, fontSize: '0.75rem' }}>|</span>
      <span style={{ opacity: currentLanguage.startsWith('uk') ? 0.4 : 1, transition: 'opacity 0.2s' }}>EN</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
