import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
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
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px',
      }}
    >
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontSize: '3rem', marginBottom: '16px' }}
        >
          dmi3Guide
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}
        >
          A collection of my pet projects that you can use, fork or just check out.
        </motion.p>
      </header>

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
    </motion.div>
  );
};

export default HomePage;
