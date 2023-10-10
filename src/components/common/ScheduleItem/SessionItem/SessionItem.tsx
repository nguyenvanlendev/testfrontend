import React, { useState } from 'react';

const SessionItem = ({
  label,
  className,
  onClick,
  isChoose,
  isDisabled
}: {
  label: string;
  className: string;
  onClick: any;
  isChoose: boolean;
  isDisabled: boolean
}) => {
  const defaultClick = () => {
    return;
  }
  return (
    <div className={`${className} session ${isChoose ? 'active' : ''}`} onClick={isDisabled ? defaultClick:onClick}>
      {label}
    </div>
  );
};

export default SessionItem;
