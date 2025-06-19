import React, { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import styles from './GlassButton.module.scss';

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'border';
  icon?: ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'secondary',
  icon,
  iconOnly = false,
  disabled = false,
  className = '',
  onClick,
  ...rest
}) => {
  
  const buttonClasses = [
    styles.glassButton,
    styles[variant],
    icon ? styles.withIcon : '',
    iconOnly ? styles.iconOnly : '',
    className,
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  const buttonStyle: CSSProperties | undefined = disabled ? {
    opacity: '0.5',
    cursor: 'not-allowed',
    pointerEvents: 'auto' as const,
    boxShadow: 'none'
  } : undefined;

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      style={buttonStyle}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {(!iconOnly && children) && children}
    </button>
  );
};

export default GlassButton; 