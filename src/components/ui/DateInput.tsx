// src/components/ui/DateInput.tsx
import React from 'react';
import { CalendarIcon } from './icons';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  error = '',
  className = '',
  disabled = false
}) => {
  const handleCalendarClick = () => {
    if (disabled) return;
    
    // Crear un input de tipo date temporal para abrir el picker
    const input = document.createElement('input');
    input.type = 'date';
    input.value = value;
    input.addEventListener('change', (e) => {
      onChange((e.target as HTMLInputElement).value);
    });
    input.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className={`block text-sm font-medium ${disabled ? 'text-foreground-muted' : 'text-foreground'}`}>
        {label} {required && <span className="text-foreground-muted">*</span>}
      </label>
      
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`
            w-full px-3 py-2 rounded-lg border transition-all duration-200 outline-none
            bg-background text-foreground placeholder-foreground-muted
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500' 
              : 'border-border hover:border-border-hover focus:border-border-active focus:ring-2 focus:ring-border-active'
            }
            ${disabled 
              ? 'bg-foreground-muted text-foreground-muted border-border cursor-not-allowed opacity-60'
              : ''
            }
          `}
        />
        
        <button
          type="button"
          onClick={handleCalendarClick}
          disabled={disabled}
          className={`
            absolute right-3 top-1/2 transform -translate-y-1/2
            p-1 rounded-md transition-colors duration-200
            ${disabled 
              ? 'text-foreground-muted cursor-not-allowed' 
              : 'text-foreground-muted hover:text-foreground hover:bg-surface'
            }
          `}
        >
          <CalendarIcon size="sm" />
        </button>
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};