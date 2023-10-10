import React from 'react';
import { BookAvatar } from '../../../assets/svg/BookAvatar';
import { SvgSchedule } from '../../../assets/svg/SvgSchedule';
import { SvgClock } from '../../../assets/svg/SvgClock';
import { PersonAvatar } from '../../../assets/svg/PersonAvatar';
import { GradeAvatar } from '../../../assets/svg/GradeAvatar';
import { LocaAvatar } from '../../../assets/svg/LocaAvatar';
import GenderIcon from '../../../assets/svg/GenderIcon';
import './CardInfo.scss';
import ReactTooltip from 'react-tooltip';
import { SmallStar } from '../../../assets/svg/SmallStar';
import { convertSessionListToString } from '../../../utils/common';
import SingleStar from '../../../assets/svg/SingleStar';

export const CardInfo: React.FC<ICardPost> = ({ title, schedule, timepost, name, classes, location, gender }) => {
  return (
    <div className="card-info">
      <div className="card-info-wrapper card-info__title">
        <span className="card-info__icon">
          <BookAvatar />
        </span>
        <span className="card-info__label">{title}</span>
      </div>
      <div className="card-info-wrapper card-info__schedule">
        <span className="card-info__icon">
          <SvgSchedule />
        </span>
        <div className="card-info__label">
          Thời gian:
          <span className="card-info__label--session-count">
            {schedule?.length ? ` ${schedule.length} buổi/ tuần` : ' Linh hoạt'}
            <ReactTooltip place="bottom" type="dark" effect="solid" multiline={true}>
              {schedule?.length ? (
                <div className="card-info__tooltip">
                  <div className="card-info__tooltip-header">
                    <SingleStar />
                    <div>
                      <p className="static">Thời gian dạy: </p>
                      {schedule.map((item: any, index: number) => {
                        return (
                          <p className="card-info__tooltip-item" key={index}>
                            {item.WeekdayText}: <span>{convertSessionListToString(item.SessionDays)}</span>
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-info__tooltip">
                  <div className="card-info__tooltip-header">
                    <SingleStar />
                    <p className="dynamic">Thời gian dạy linh hoạt theo lịch của gia sư và học sinh.</p>
                  </div>
                </div>
              )}
            </ReactTooltip>
          </span>
        </div>
      </div>

      <div className="card-info-wrapper card-info__timepost">
        <span className="card-info__icon">
          <SvgClock />
        </span>
        <span className="card-info__label">Ngày đăng: {timepost}</span>
      </div>
      <div className="card-info-wrapper card-info__gender">
        <span className="card-info__icon">
          <GenderIcon />
        </span>
        <span className="card-info__label">Giới tính: {gender}</span>
      </div>
      <div className="card-info-wrapper card-info__name">
        <span className="card-info__icon">
          <PersonAvatar />
        </span>
        <span className="card-info__label">{name}</span>
      </div>
      <div className="card-info-wrapper card-info__classes">
        <span className="card-info__icon">
          <GradeAvatar />
        </span>
        <span className="card-info__label">{classes}</span>
      </div>
      <div className="card-info-wrapper card-info__location">
        <span className="card-info__icon">
          <LocaAvatar />
        </span>
        <span className="card-info__label">{location}</span>
      </div>
    </div>
  );
};
