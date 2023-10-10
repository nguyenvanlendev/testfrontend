import React from 'react';
import './PrimaryButton.scss';

export const PrimaryButton = React.forwardRef<any, IPrimaryButton>(
  (
    {
      onClick,
      className,
      children,
      size,
      shape,
      disabled,
      hideBorder,
      checkedIcon,
      wrongIcon,
      bgColor,
      backgroundColor,
      ...rest
    },
    ref,
  ) => {
    const checkTypeBtn = () => {
      let initalClass = `primary-button ${className} `;
      if (shape) {
        initalClass += `primary-button--${shape} `;
      }
      if (bgColor) {
        initalClass += `primary-button--${bgColor} `;
      }
      if (size) {
        initalClass += `primary-button--${size} `;
      }
      if (disabled) {
        initalClass += 'primary-button--disabled ';
      }
      if (hideBorder) {
        initalClass += 'primary-button--hide-border ';
      }
      if (checkedIcon) {
        initalClass += 'primary-button--checked ';
      }
      if (wrongIcon) {
        initalClass += 'primary-button--wrong ';
      }
      return initalClass;
    };
    return (
      <span
        onClick={!disabled ? onClick : () => {}}
        className={checkTypeBtn()}
        style={rest}
        ref={ref}
        // style={{background: backgroundColor}}
      >
        {children}
      </span>
    );
  },
);
