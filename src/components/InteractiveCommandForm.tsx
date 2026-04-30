import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Field {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'string' | 'number' | 'boolean';
}

interface FormConfig {
  baseCommand: string;
  fields: Field[];
}

export const InteractiveCommandForm: React.FC<{ configStr: string }> = ({ configStr }) => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    try {
      const parsed = JSON.parse(configStr);
      setConfig(parsed);
      // Initialize values
      const initial: Record<string, string> = {};
      parsed.fields.forEach((f: Field) => {
        initial[f.key] = '';
      });
      setValues(initial);
    } catch (e) {
      console.error("Failed to parse interactive form config", e);
    }
  }, [configStr]);

  if (!config) {
    return <div style={{ color: 'red' }}>Invalid interactive command configuration.</div>;
  }

  const generatedCommand = `${config.baseCommand} ${config.fields
    .map(f => {
      const val = values[f.key];
      return val ? `--${f.key} ${val}` : '';
    })
    .filter(Boolean)
    .join(' ')}`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '8px',
      padding: '20px',
      margin: '1.5em 0',
      border: '1px solid var(--border)',
    }}>
      <h4 style={{ marginTop: 0, marginBottom: '16px', color: 'var(--text-main)', fontSize: '1.1rem' }}>
        Interactive Command Generator
      </h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {config.fields.map(field => {
          const isBoolean = field.type === 'boolean';
          return (
            <div key={field.key} style={{ display: 'flex', flexDirection: isBoolean ? 'row' : 'column', gap: '6px', alignItems: isBoolean ? 'center' : 'flex-start' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{field.label} (--{field.key})</label>
              {isBoolean ? (
                <input
                  type="checkbox"
                  checked={values[field.key] === 'true'}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.checked ? 'true' : 'false' })}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--accent)'
                  }}
                />
              ) : (
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  placeholder={field.placeholder || ''}
                  value={values[field.key] || ''}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    outline: 'none',
                    fontFamily: 'monospace',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid var(--accent)'}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: '12px 16px',
          paddingRight: '50px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          color: 'var(--text-main)',
          wordBreak: 'break-all',
          minHeight: '45px',
          display: 'flex',
          alignItems: 'center'
        }}>
          {generatedCommand || config.baseCommand}
        </div>
        
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '8px',
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
          title="Copy command"
        >
          {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};
