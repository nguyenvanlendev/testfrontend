import React, { useEffect, useState } from 'react';
import './TutorItem.scss';
import { ListStar } from '../ListStar/ListStar';
import { PersonAvatar } from '../../../assets/svg/PersonAvatar';
import { BookAvatar } from '../../../assets/svg/BookAvatar';
import { GradeAvatar } from '../../../assets/svg/GradeAvatar';
import { LocaAvatar } from '../../../assets/svg/LocaAvatar';
import { useNavigate } from 'react-router-dom';

export const TutorItem: React.FC<TutorItem> = ({
  id,
  img,
  name,
  subjects,
  grades,
  addresses,
  numberStar,
  isHorizontal,
  onClick,
  className = '',
  layer = '',
  titleButton,
  isFromNewPostPage = false,
  ischosen = false,
  clickWhenChosen = () => {},
  clickWhenNotChosen = () => {},
  textBtnWhenChosen = 'Chọn dạy',
  textBtnWhenNotChosen = 'Đăng ký',
  onClickTotal = () => {},
  isHiddenBtn,
  isFromListTutor =  false
}) => {
  const [isChosen, setIsChosen] = useState<boolean>(false);

  useEffect(() => {
    setIsChosen(ischosen);
  }, [ischosen]);

  return (
    <div
      className={`tutor-item ${isHorizontal ? `tutor-item__horizontal ${className}` : `${className}`} `}
      onClick={onClickTotal}
    >
      {!isHorizontal && (
        <div className="tutor-item__avatar">
          <img src={img} alt="" />
        </div>
      )}

      {isHorizontal && (
        <div className="tutor-item__left">
          <div
            className="tutor-item__avatar"
          >
            <img src={img} alt="" />
          </div>
          <div className="tutor-item__detail tutor-item__evaluate">
            <ListStar score={numberStar} number={numberStar+1} />
          </div>
          
          {!isHiddenBtn && (
            <div className={isChosen && isFromNewPostPage ? 'tutor-item__registered' : 'tutor-item__register'}>
              <button
                onClick={e => {
                  e.stopPropagation();
                  if (isChosen) {
                    if(!isFromListTutor) setIsChosen(false)
                    clickWhenChosen();
                  } else {
                    setIsChosen(true)
                    clickWhenNotChosen();
                  }
                }}
              >
                {isChosen ? textBtnWhenChosen : textBtnWhenNotChosen}
              </button>
            </div>
          )}
        </div>
      )}
      <div
        className="tutor-item__content"
      >
        <div className="tutor-item__detail  tutor-item__name">
          <PersonAvatar />
          <span>{name}</span>
        </div>

        <div className="tutor-item__detail tutor-item__subjects">
          <BookAvatar />
          <span>{subjects}</span>
        </div>

        <div className="tutor-item__detail tutor-item__grades">
          <GradeAvatar />
          <span>{grades}</span>
        </div>

        <div className="tutor-item__detail tutor-item__addresses">
          <LocaAvatar />
          <span>{addresses}</span>
        </div>

        {!isHorizontal && (
          <div className="tutor-item__detail tutor-item__evaluate">
            <ListStar score={numberStar} number={numberStar+1} />
          </div>
        )}
      </div>

      {!isHorizontal && (
        <div className="tutor-item__register">
          <button
            onClick={e => {
              e.stopPropagation();
              if (isChosen) {
                if(!isFromListTutor) setIsChosen(false);
                clickWhenChosen();
              } else {
                setIsChosen(true)
                clickWhenNotChosen();
              }
            }}
          >
            {isChosen ? textBtnWhenChosen : textBtnWhenNotChosen}
          </button>
        </div>
      )}

      {isHorizontal && layer.length !== 0 && (
        <div className="tutor-item__layer">
          <p className="tutor-item__layer--text">{layer}</p>
        </div>
      )}
    </div>
  );
};
