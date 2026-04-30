import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div style={{
      color: 'var(--text-secondary)',
      lineHeight: '1.7',
      fontSize: '1.1rem',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 style={{ color: 'var(--text-main)', marginTop: '2em', marginBottom: '1em', fontSize: '2.5rem' }} {...props} />,
          h2: ({node, ...props}) => <h2 style={{ color: 'var(--text-main)', marginTop: '1.8em', marginBottom: '0.8em', fontSize: '1.8rem', borderBottom: '1px solid var(--bg-secondary)', paddingBottom: '0.3em' }} {...props} />,
          h3: ({node, ...props}) => <h3 style={{ color: 'var(--text-main)', marginTop: '1.5em', marginBottom: '0.5em', fontSize: '1.4rem' }} {...props} />,
          p: ({node, ...props}) => <p style={{ marginBottom: '1.2em' }} {...props} />,
          a: ({node, ...props}) => <a style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }} target="_blank" rel="noopener noreferrer" {...props} />,
          ul: ({node, ...props}) => <ul style={{ paddingLeft: '1.5em', marginBottom: '1.2em' }} {...props} />,
          ol: ({node, ...props}) => <ol style={{ paddingLeft: '1.5em', marginBottom: '1.2em' }} {...props} />,
          li: ({node, ...props}) => <li style={{ marginBottom: '0.5em' }} {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote 
              style={{ 
                borderLeft: '4px solid var(--accent)', 
                paddingLeft: '1em', 
                color: 'var(--text-secondary)',
                margin: '1.5em 0',
                fontStyle: 'italic',
                backgroundColor: 'rgba(250, 240, 230, 0.05)',
                padding: '1em'
              }} 
              {...props} 
            />
          ),
          code({node, inline, className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus as any}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  borderRadius: '8px',
                  padding: '1.2em',
                  margin: '1.5em 0',
                  fontSize: '0.9rem',
                  backgroundColor: 'var(--bg-secondary)'
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code 
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  padding: '0.2em 0.4em', 
                  borderRadius: '4px',
                  color: 'var(--text-main)',
                  fontFamily: 'monospace',
                  fontSize: '0.9em'
                }} 
                {...props}
              >
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
