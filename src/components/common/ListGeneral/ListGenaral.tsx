import React from 'react';
import './ListGenaral.scss';

export const ListGenaral: React.FC<ListGenaral> = ({ title, children: Component, isShow, onClick}) => {
  return (
    <div className="list-general">
      <div className="list-general__header">
        <div className="list-general__header--title">{title}</div>
        {isShow && <div className="list-general__header--btn" onClick={onClick}>Xem tất cả</div>}
      </div>
      <div className="list-general__content">
         {Component}
      </div>
    </div>
  );
};
