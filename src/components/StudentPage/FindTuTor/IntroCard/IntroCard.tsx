import { useNavigate } from 'react-router-dom';
import './IntroCard.scss';
import React from 'react';
export const IntroCard: React.FC<IntroCard> = ({ title, buttonContent, img, onClick }) => {
  const navigate = useNavigate();
  const clickDefault = () => {
    navigate('/tutor/profiles/new?isFrom=tutor');
    return;
  };

  return (
    <div className="intro-card">
      <div className="intro-card__img">
        <img src={img} alt="" />
      </div>

      <div className="intro-card__content">
        <div className="intro-card__content--title">{title}</div>
        <div className="intro-card__content--button">
          <button onClick={onClick || clickDefault}>{buttonContent}</button>
        </div>
      </div>
    </div>
  );
};
