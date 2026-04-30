import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div style={{ position: 'relative', margin: '1.5em 0' }}>
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          title="Copy code"
        >
          {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
        </button>
        <SyntaxHighlighter
          style={vscDarkPlus as any}
          language={match[1]}
          PreTag="div"
          customStyle={{
            borderRadius: '8px',
            padding: '1.2em',
            margin: 0,
            fontSize: '0.9rem',
            backgroundColor: 'var(--bg-secondary)',
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
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
};

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
          code: CodeBlock
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
