import React from 'react';
import './ButtonVerJob.scss';

export const ButtonVerJob: React.FC<IButtonVerJob> = ({ children, className, type, onClick }) => {
  return (
    <button className={`btn-ver-job ${className ? className : ''}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
