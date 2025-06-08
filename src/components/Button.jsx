// components/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
  to,
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  // Combina todas as classes
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    loading ? 'button--loading' : '',
    disabled ? 'button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Conteúdo do botão
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="button__icon button__icon--left">{icon}</span>
      )}
      <span className="button__text">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="button__icon button__icon--right">{icon}</span>
      )}
      {loading && (
        <span className="button__loader">
          <span className="button__loader-dot" />
          <span className="button__loader-dot" />
          <span className="button__loader-dot" />
        </span>
      )}
    </>
  );

  // Renderiza como Link ou button
  return to ? (
    <Link to={to} className={buttonClasses} {...props}>
      {content}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;