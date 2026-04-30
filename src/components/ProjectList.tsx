import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        width: '100%',
      }}
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={item} style={{ height: '100%' }}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectList;
