import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useProjects } from '../hooks/useProjects';
import githubIcon from '../assets/github.svg';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [markdownLoading, setMarkdownLoading] = useState<boolean>(true);

  const { projects, loading: projectsLoading } = useProjects();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    // Wait until projects are loaded
    if (projectsLoading) return;

    if (!project) {
      navigate('/404');
      return;
    }

    const fetchMarkdown = async () => {
      try {
        const response = await fetch(project.markdownFile);
        if (!response.ok) {
          throw new Error('Failed to fetch markdown');
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        setContent('# Error loading project details.\n\nSorry, we could not load the markdown file for this project.');
        console.error(error);
      } finally {
        setMarkdownLoading(false);
      }
    };

    fetchMarkdown();
  }, [project, projectsLoading, navigate]);

  if (projectsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Loader size={48} color="var(--accent)" />
        </motion.div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 24px 80px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={18} /> Back to list
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}
        >
          <img
            src={githubIcon}
            alt="GitHub"
            width={18}
            height={18}
            style={{ filter: 'invert(1) opacity(0.8)' }}
          />
          View Source
        </a>
      </div>

      {markdownLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader size={48} color="var(--accent)" />
          </motion.div>
        </div>
      ) : (
        <article>
          <MarkdownRenderer content={content} />
        </article>
      )}
    </motion.div>
  );
};

export default ProjectPage;
