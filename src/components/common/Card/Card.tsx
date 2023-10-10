import React from 'react';
import './Card.scss';
import img from './img.jpg';

export const Card: React.FC<ICard> = ({
  imgCard,
  title,
  subTitle,
  className,
  onClick,
}) => {
  const _className = 'card-container ' + className;
  return (
    <div className={_className} onClick={onClick}>
      <div
        style={{
          background: `url(${img}) no-repeat `,
          backgroundSize: 'auto 100%',
        }}
        className='card-container__image'
      >
        {/* <img
          src={
            'https://cdn.pixabay.com/photo/2022/02/07/22/27/winter-7000429__340.jpg'
          }
          alt=''
          className='card-container__image--illustration'
        /> */}
      </div>
      <div className='card-container__title'>
        <p className='card-container__title--content'>{title}</p>
        <span className='card-container__title--sub'>{subTitle}</span>
      </div>
    </div>
  );
};
