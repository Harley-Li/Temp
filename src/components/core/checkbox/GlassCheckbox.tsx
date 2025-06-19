import React, { InputHTMLAttributes } from 'react';
import styles from './GlassCheckbox.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';

export interface GlassCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const GlassCheckbox: React.FC<GlassCheckboxProps> = ({
  label,
  checked = false,
  disabled = false,
  onChange,
  className = '',
  ...rest
}) => {
  const { theme } = useTheme();
  
  const containerClasses = [
    styles.checkboxContainer,
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <label className={containerClasses}>
      <input 
        type="checkbox"
        className={styles.hiddenInput}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <span className={styles.checkmark}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default GlassCheckbox; 