import React from 'react';
import { Loader } from '../Loader/Loader';
import './Button.scss';

export const Button: React.FC<IButton> = ({
  children,
  className,
  borderRadius,
  width,
  height,
  padding,
  onClick,
  marginLeft,
  marginRight,
  type,
  isLoading,
  isBlur,
  isDisable
}) => {
  const checkTypeBtn = () => {
    let initalClass = `btn ${className}`;

    if (isBlur) {
      initalClass = `btn btn--blur ${className}`;
    }
    return initalClass;
  };
 
  return (
    <button
      className={checkTypeBtn()}
      style={{ borderRadius, height, width, padding, marginLeft, marginRight }}
      onClick={onClick}
      type={type}
      disabled={isLoading || isDisable}
    >
      {isLoading && <Loader isSmall marginRight={4} />}
      {children}
    </button>
  );
};
