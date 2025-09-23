import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
  error = '',
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-foreground-muted">*</span>}
      </label>
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3 py-2 rounded-lg border transition-all duration-200
          bg-background text-foreground placeholder-foreground-muted
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500' 
            : 'border-border hover:border-border-hover focus:border-border-active focus:ring-2 focus:ring-border-active'
          }
        `}
      />
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};