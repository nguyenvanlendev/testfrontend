import './ListTutor.scss';
import React from 'react';
import { TutorItem } from '../TutorItem/TutorItem';
import { useNavigate } from 'react-router-dom';

export const convertSubjectsToString = (
  lisSubjects: {
    TutorId: number;
    SubjectId: number;
    SubjectName: string;
  }[],
) => {
  let res = '';
  for (let i = 0; i < lisSubjects.length; i++) {
    if (i < lisSubjects.length - 1) res += lisSubjects[i].SubjectName + ', ';
    if (i === lisSubjects.length - 1) {
      res += lisSubjects[i].SubjectName;
    }
  }
  return res;
};

export const convertClassesToString = (
  listClasses: {
    TutorId: number;
    ClassId: number;
    ClassName: string;
  }[],
) => {
  let res = '';
  for (let i = 0; i < listClasses.length; i++) {
    if (i < listClasses.length - 1) res += listClasses[i].ClassName + ', ';
    if (i === listClasses.length - 1) {
      res += listClasses[i].ClassName;
    }
  }
  return res;
};

export const convertAreaListToString = (
  areaList: {
    TutorId: number;
    AreaId: number;
    AreaName: string;
  }[],
) => {
  let res = '';
  for (let i = 0; i < areaList.length; i++) {
    if (i !== areaList.length - 1) res += areaList[i].AreaName + ', ';
    if (i === areaList.length - 1) {
      res += areaList[i].AreaName;
    }
  }
  return res;
};

export const ListTutor: React.FC<ListTutor> = ({ listTutor, isHorizontal, onClick }) => {
  const navigate = useNavigate();
  
  const renderListTutor = (listTutor: ListTutorItem) => {
    return listTutor.map((item: ITutor, index: number) => {
      return (
        <TutorItem
          id={item.TutorId || ''}
          key={index}
          img={item.Avatar || ''}
          name={item.FullName || ''}
          subjects={item.TutorSubjectLists ? convertSubjectsToString(item.TutorSubjectLists) : ''}
          grades={item.TutorClassLists ? convertClassesToString(item.TutorClassLists) : ''}
          numberStar={item.TotalRating ? Math.floor(item.TotalRating) : 0}
          addresses={item.TutorAreaLists ? convertAreaListToString(item.TutorAreaLists) : ''}
          isHorizontal={isHorizontal}
          onClick={(e:any) => {
            onClick(item.TutorId,e);
          }}
          clickWhenNotChosen={
            (e:any) => {
              onClick(item.TutorId,e);
            }
          }
          onClickTotal={() => {
            navigate(`/student/tutor-detail-info/${item.TutorId}`);
          }}
          isFromListTutor = { true }
        />
      );
    });
  };

  return (
    <div className={`list-tutor ${isHorizontal ? 'list-tutor__horizontal' : ''}`}>
      {/* <div className="list-tutor__header">
        <div className="list-tutor__header--title">{title}</div>
        <div className="list-tutor__header--btn">Xem tất cả</div>
      </div> */}
      <div className="list-tutor__contain">
        <div className="list-tutor__list">{renderListTutor(listTutor)}</div>
      </div>
    </div>
  );
};
