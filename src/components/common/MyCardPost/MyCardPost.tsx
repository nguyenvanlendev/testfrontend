import React, { useMemo } from 'react';
import { BookAvatar } from '../../../assets/svg/BookAvatar';
import { SvgSchedule } from '../../../assets/svg/SvgSchedule';
import './MyCardPost.scss';
import { SvgClock } from '../../../assets/svg/SvgClock';
import { PersonAvatar } from '../../../assets/svg/PersonAvatar';
import { GradeAvatar } from '../../../assets/svg/GradeAvatar';
import { LocaAvatar } from '../../../assets/svg/LocaAvatar';
import { Button } from '../Button/Button';

import moment from 'moment';
import { convertSessionListToString, totalNumberOfSessionsPerWeek } from '../../../utils';
import SingleStar from '../../../assets/svg/SingleStar';
import ReactTooltip from 'react-tooltip';



interface MyCardPost extends IPostNew {
  title?: string;
  onClick?: (event: any, classid: number, ischoosefinal?: number) => void;
  buttonText?: string;
  isOpenPost?: boolean;
  postareasText?: string;
  navigate?:any
}

export const MyCardPost: React.FC<MyCardPost> = ({
  PostSessionWeeks,
  PostTeachingForms,
  SubjectText,
  PostDate,
  FullName,
  ClassText,
  postareasText,
  onClick,
  buttonText,
  IsChooseFinal,
  Id,
  navigate = () => {}
}) => {
  const isChoose = useMemo(() => {
    if (IsChooseFinal === 0 || IsChooseFinal === 1) {
      return true;
    } else {
      return false;
    }
  }, [IsChooseFinal]);

  const handleClick = (event: any) => {
    event.stopPropagation(); 
    if (Id && onClick && isChoose) {
      return onClick(event, Id, IsChooseFinal);
    } else if (Id && onClick && !isChoose) {
      return onClick(event, Id);
    }
  };

  const formatDate = (rawDate: string) => {
    const date = moment(rawDate, 'YYYY-MM-DDTHH:mm:ss');
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
  };

  let handleTitle = (postTeachingForms: IPostTeachingFroms[]) => {
    const hasInPerson = postTeachingForms && postTeachingForms.some(form => form.Title === 'Tại nhà');
    const hasOnline = postTeachingForms && postTeachingForms.some(form => form.Title === 'Online');
    const hasCenter = postTeachingForms && postTeachingForms.some(form => form.Title === 'Trung tâm');
    if (SubjectText) {
      let title = `Tìm gia sư ${SubjectText} `;
      if (hasInPerson) {
        return title + 'Tại nhà';
      } else if (hasOnline) {
        return title + 'Online';
      } else if (hasCenter) {
        return title + 'Online';
      } else {
        return title;
      }
    }
  };

  return (
    <div className="my-card-post" onClick={() => {
      navigate();
    }}>
      <div className="my-card-post__title">
        <span className="my-card-post__icon">
          <BookAvatar />
        </span>
        <span className="my-card-post__label">{handleTitle(PostTeachingForms as IPostTeachingFroms[])}</span>
      </div>
      <div className="my-card-post__schedule">
        <span className="my-card-post__icon">
          <SvgSchedule />
        </span>
        <span className="my-card-post__label ">
          Thời gian:{' '}
          <span className='sessions'>
          {PostSessionWeeks && totalNumberOfSessionsPerWeek(PostSessionWeeks)
            ? ` ${totalNumberOfSessionsPerWeek(PostSessionWeeks)} buổi/ tuần`
            : ' Linh hoạt'}
             <ReactTooltip place="bottom" type="dark" effect="solid" multiline={true}>
            {PostSessionWeeks?.length ? (
              <div className="sessions__tooltip">
                <div className="sessions__tooltip-header">
                  <SingleStar />
                  <div>
                    <p className="static">Thời gian dạy: </p>
                    {PostSessionWeeks.map((item: any, index: number) => {
                      return (
                        <p className="sessions__tooltip-item" key={index}>
                          {item.WeekdayText}: <span>{convertSessionListToString(item.SessionDays)}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="sessions__tooltip">
                <div className="sessions__tooltip-header">
                  <SingleStar />
                  <p className="dynamic">Thời gian dạy linh hoạt theo lịch của gia sư và học sinh.</p>
                </div>
              </div>
            )}
          </ReactTooltip>
          </span>
        </span>
      </div>
      <div className="my-card-post__timepost">
        <span className="my-card-post__icon">
          <SvgClock />
        </span>
        <span className="my-card-post__label">Ngày đăng: {PostDate && formatDate(PostDate)}</span>
      </div>
      <div className="my-card-post__name">
        <span className="my-card-post__icon">
          <PersonAvatar />
        </span>
        <span className="my-card-post__label">{FullName}</span>
      </div>
      <div className="my-card-post__classes">
        <span className="my-card-post__icon">
          <GradeAvatar />
        </span>
        <span className="my-card-post__label">{ClassText}</span>
      </div>
      <div className="my-card-post__location">
        <span className="my-card-post__icon">
          <LocaAvatar />
        </span>
        <span className="my-card-post__label">{postareasText}</span>
      </div>
      <Button
        className={IsChooseFinal === 1 ? `my-card-post__submit active` : `my-card-post__submit`}
        onClick={(e: any) => handleClick(e)}
      >
        {buttonText}
      </Button>
    </div>
  );
};
