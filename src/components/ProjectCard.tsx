import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        height: '100%',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{project.title}</h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', flexGrow: 1, lineHeight: 1.6 }}>
        {project.shortDescription}
      </p>

      {project.tags && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                backgroundColor: 'rgba(250, 240, 230, 0.1)',
                color: 'var(--accent)',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '0.85rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/project/${project.id}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600,
          marginTop: 'auto',
          alignSelf: 'flex-start'
        }}
      >
        Open <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
