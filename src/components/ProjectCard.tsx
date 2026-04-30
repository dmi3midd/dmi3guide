import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../types';
import githubIcon from '../assets/github.svg';

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{project.title}</h2>
        {project.status && project.status !== 'completed' && (
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: project.status === 'planned' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(250, 240, 230, 0.2)',
            color: project.status === 'planned' ? 'var(--text-secondary)' : 'var(--text-main)',
            whiteSpace: 'nowrap',
            marginLeft: '12px'
          }}>
            {project.status === 'planned' ? 'Planned' : 'In Dev'}
          </span>
        )}
      </div>

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <Link
          to={`/project/${project.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
          }}
        >
          Open <ArrowRight size={18} />
        </Link>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <img
            src={githubIcon}
            alt="GitHub"
            width={20}
            height={20}
            style={{ filter: 'invert(1) opacity(0.8)' }}
          />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
