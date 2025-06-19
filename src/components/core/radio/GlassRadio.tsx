import React, { InputHTMLAttributes, ReactNode } from 'react';
import styles from './GlassRadio.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';

export interface GlassRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  value: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface GlassRadioGroupProps {
  children: ReactNode;
  name: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  horizontal?: boolean;
  className?: string;
}

// 单选按钮组件
export const GlassRadio: React.FC<GlassRadioProps> = ({
  label,
  checked = false,
  disabled = false,
  value,
  name,
  onChange,
  className = '',
  ...rest
}) => {
  const { theme } = useTheme();
  
  const containerClasses = [
    styles.radioContainer,
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <label className={containerClasses}>
      <input 
        type="radio"
        className={styles.hiddenInput}
        checked={checked}
        disabled={disabled}
        value={value}
        name={name}
        onChange={onChange}
        {...rest}
      />
      <span className={styles.radiomark}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

// 单选按钮组组件
export const GlassRadioGroup: React.FC<GlassRadioGroupProps> = ({
  children,
  name,
  value,
  onChange,
  horizontal = false,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value, e);
    }
  };
  
  // 修复类型问题，使用类型断言
  const radioButtons = React.Children.map(children, (child) => {
    // 检查是否是React元素，不检查具体类型，以便更灵活地处理
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        name,
        checked: child.props.value === value,
        onChange: handleChange,
      });
    }
    return child;
  });
  
  const groupClasses = [
    styles.radioGroup,
    horizontal ? styles.horizontal : '',
    className
  ].filter(Boolean).join(' ');
  
  return <div className={groupClasses}>{radioButtons}</div>;
};

export default GlassRadio; 