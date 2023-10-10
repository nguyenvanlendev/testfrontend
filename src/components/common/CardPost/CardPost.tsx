import React, { useEffect, useState } from 'react';
import { BookAvatar } from '../../../assets/svg/BookAvatar';
import { SvgSchedule } from '../../../assets/svg/SvgSchedule';
import './CardPost.scss';
import { SvgClock } from './../../../assets/svg/SvgClock';
import { PersonAvatar } from '../../../assets/svg/PersonAvatar';
import { GradeAvatar } from '../../../assets/svg/GradeAvatar';
import { LocaAvatar } from '../../../assets/svg/LocaAvatar';
import { Button } from './../Button/Button';
import updateIcon from '../../../assets/img/draft/updateProfle.png';
import ReactTooltip from 'react-tooltip';
import { useNavigate } from 'react-router';
import SingleStar from '../../../assets/svg/SingleStar';
import { formatDateToDDMMYYYY } from '../../../helpers/app';
import { convertSessionListToString, totalNumberOfSessionsPerWeek } from '../../../utils/common';

export const CardPost: React.FC<ICardPost> = ({
  id,
  title,
  schedule,
  timepost,
  name,
  classes,
  location,
  startdate,
  nextfeedate,
  isOpen,
  isOpenPost,
  handleEditPost,
  handleOpenCloseToggle,
  onClick = () => {},
  onClickTotal = () => {},
  isConfirmTeaching = false,
  isChosen = false
  
}) => {
  const [isOpenToggle, setIsOpenToggle] = useState<boolean>(false);

  const history = useNavigate();

  // const convertSessionListToString = (
  //   sessionList: {
  //     SessionDayId: number;
  //     SessionDayText: string;
  //   }[],
  // ) => {
  //   let res = '';
  //   for (let i = 0; i < sessionList.length; i++) {
  //     if (i !== sessionList.length - 1) res += sessionList[i].SessionDayText + ', ';
  //     if (i === sessionList.length - 1) {
  //       res += sessionList[i].SessionDayText;
  //     }
  //   }
  //   return res;
  // };

  useEffect(() => {
    setIsOpenToggle(isOpenPost || false);
  }, [isOpenPost]);

  const handleToggle = () => {
    setIsOpenToggle(!isOpenToggle);
    handleOpenCloseToggle(id, isOpenToggle);
  };

  const handleCountSession = (schedule: any) => {
    let sessionTotal = 0;
    for (let i = 0; i < schedule.length; i++) {
      sessionTotal += schedule[i].SessionDays.length;
    }
    return sessionTotal;
  };

  return (
    <div className="card-post" onClick={onClickTotal}>
      <div className="card-post__title">
        <span className="card-post__icon">
          <BookAvatar />
        </span>
        <span className="card-post__label">{title}</span>
      </div>
      <div className="card-post__schedule">
        <span className="card-post__icon">
          <SvgSchedule />
        </span>
        <span className="card-post__label">Thời gian dạy: </span>
        <span className="card-post__label card-post__label-highlight">
          {schedule?.length ? ` ${totalNumberOfSessionsPerWeek(schedule)} buổi/ tuần` : ' linh hoạt'}
          <ReactTooltip place="bottom" type="dark" effect="solid" multiline={true}>
            {schedule?.length ? (
              <div className="card-post__tooltip">
                <div className="card-post__tooltip-header">
                  <SingleStar />
                  <div>
                    <p className="static">Thời gian dạy: </p>
                    {schedule.map((item: any, index: number) => {
                      return (
                        <p className="card-post__tooltip-item" key={index}>
                          {item.WeekdayText}: <span>{convertSessionListToString(item.SessionDays)}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-post__tooltip">
                <div className="card-post__tooltip-header">
                  <SingleStar />
                  <p className="dynamic">Thời gian dạy linh hoạt theo lịch của gia sư và học sinh.</p>
                </div>
              </div>
            )}
          </ReactTooltip>
        </span>
      </div>
      <div className="card-post__timepost">
        <span className="card-post__icon">
          <SvgClock />
        </span>
        <span className="card-post__label">Ngày đăng: {timepost}</span>
      </div>
      <div className="card-post__name">
        <span className="card-post__icon">
          <PersonAvatar />
        </span>
        <span className="card-post__label">{name}</span>
      </div>
      <div className="card-post__classes">
        <span className="card-post__icon">
          <GradeAvatar />
        </span>
        <span className="card-post__label">{classes}</span>
      </div>
      <div className="card-post__location">
        <span className="card-post__icon">
          <LocaAvatar />
        </span>
        <span className="card-post__label">{location}</span>
      </div>
      {isConfirmTeaching ? (
        <>
          <div className="card-post__start-day">
            <span className="card-post__icon">
              <SvgClock />
            </span>
            <span className="card-post__label">Ngày bắt đầu: {startdate}</span>
          </div>
          <div className="card-post__next-fee-day">
            <span className="card-post__icon">
              <SvgClock />
            </span>
            <span className="card-post__label">Ngày thu phí tiếp theo: {nextfeedate}</span>
          </div>
        </>
      ) : isOpen ? (
        <>
          <img className="update-icon" src={updateIcon} alt="" onClick={handleEditPost} />
          <div className={'toggle'}>
            <input type="checkbox" checked={isOpenToggle} onClick={handleToggle} />
            <label>
              <span> {isOpenPost ? 'Đóng tin' : 'Mở tin'}</span>
            </label>
          </div>
        </>
      ) : (
        <Button
          className={`card-post__submit ${isChosen && 'card-post__submit--chosen'}`}
          onClick={(e: any) => {
            e.stopPropagation();
            if(!isChosen)
            onClick();
          }}
        >
          {isChosen?"Đã chọn":"Đăng ký"}
        </Button>
      )}
    </div>
  );
};
