import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        padding: '24px'
      }}
    >
      <h1 style={{ fontSize: '6rem', margin: '0 0 16px', color: 'var(--accent)' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>{t('notFound.title')}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '400px' }}>
        {t('notFound.description')}
      </p>
      <Link 
        to="/"
        style={{
          backgroundColor: 'var(--accent)',
          color: 'var(--bg-main)',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: 600,
          textDecoration: 'none'
        }}
      >
        {t('notFound.goHome')}
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
