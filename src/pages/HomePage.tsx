import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import githubIcon from '../assets/github.svg';
import ProjectList from '../components/ProjectList';
import { useProjects } from '../hooks/useProjects';

const HomePage: React.FC = () => {
  const { projects, loading, error } = useProjects();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        width: '100%',
      }}
    >
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '30px 40px',
        marginBottom: '20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          dmi3Guide
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
        >
          {/* Future links can be added here */}
          <a
            href="https://github.com/dmi3midd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-main)',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease'
            }}
          >
            <img
              src={githubIcon}
              alt="GitHub"
              style={{
                width: '24px',
                height: '24px',
                filter: 'invert(1) brightness(2)'
              }}
            />
          </a>
        </motion.div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px 60px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}
          >
            A collection of my pet projects that you can use, fork or just check out.
          </motion.p>
        </div>

        <main>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader size={48} color="var(--accent)" />
              </motion.div>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>
          ) : (
            <ProjectList projects={projects} />
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default HomePage;
