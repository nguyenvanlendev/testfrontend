import React from 'react';
import './SmallModal.scss';

interface ISmallModal {
  isOpen?: boolean | string;
  className?: string;
  classNameContent?: string;
  setIsOpen?: any;
  backgroundColorOverlay?: any;
    children?:any;
}

export const SmallModal: React.FC<ISmallModal> = ({ children, isOpen, className, classNameContent }) => {
  return (
    <>
      <div className="small-modal__overlay" style={{ display: isOpen ? 'block' : 'none' }}></div>
      <div
        className={`small-modal__wrapper modal ${className ? className : ''}`}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className={`small-modal__content ${classNameContent ? classNameContent : ''}`}>
          {children}
        </div>
      </div>
    </>
  );
};
