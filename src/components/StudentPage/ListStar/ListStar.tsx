import { SmallStar } from '../../../assets/svg/SmallStar';
import { LargeStar } from '../../../assets/svg/LargeStar';
import { SmallStarGray } from '../../../assets/svg/SmallStarGray';
import { LargeStarWhite } from '../../../assets/svg/LargeStarWhite';
import { useState } from 'react';
import './ListStar.scss';

export const ListStar: React.FC<ListStar> = ({ number, score, isSmallStar = true, onClick = () => {} }) => {
  const renderStar = (number: number) => {
    return [...Array(5)].map((item, index) => {
      index += 1;
      if (index < number)
        return (
          <div
            key={index}
            className={`small-star`}
            onClick={() => {
              onClick(index);
            }}
          >
            {isSmallStar ? <SmallStar /> : <LargeStar />}
          </div>
        );
      else
        return (
          <div
            key={index}
            className={`small-star`}
            onClick={() => {
              onClick(index);
            }}
          >
            {isSmallStar ? <SmallStarGray /> : <LargeStarWhite />}
          </div>
        );
    });
  };

  return (
    <div className="list-star">
      <div className="score">{score}</div>
      <div className="list">{renderStar(number)}</div>
    </div>
  );
};
