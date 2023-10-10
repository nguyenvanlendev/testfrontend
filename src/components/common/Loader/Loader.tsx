import React from 'react';
import './Loader.scss';

export const Loader: React.FC<ILoader> = ({
  className,
  color,
  marginTop,
  height,
  isSmall,
  marginRight,
  classNameContent,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        marginRight,
        position: 'relative',
        width: '50px',
        margin: 'auto',
        marginTop: '20px',
      }}
    >
      <div
        className={`loader ${className ? className : isSmall ? 'loader__small' : ''}`}
        style={{ borderLeftColor: color, borderTopColor: color, marginTop }}
      />
    </div>
  );
};
