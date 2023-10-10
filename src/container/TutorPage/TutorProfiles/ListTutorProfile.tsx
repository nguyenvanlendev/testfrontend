import { TutorItem } from '../../../components/StudentPage/TutorItem/TutorItem';
//import ModalSuccess from '../../HomePage/components/ModalSuccess';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import tutorProfileImage from '../../../assets/img/draft/tutorProfileImage.png';
import { useEffect, useState } from 'react';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { Button } from '../../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { apiPostTutor } from '../../../services/axios/apiPostTutor';
interface IListTutorProfile {
  listTutorProfiles: ITutor[];
}

const ListTutorProfile = (props: IListTutorProfile) => {
  const { listTutorProfiles } = props;
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);


 
  const convertSubjectsToString = (
    lisSubjects: {
      TutorId: number;
      SubjectId: number;
      SubjectName: string;
    }[],
  ) => {
    let res = '';
    for (let i = 0; i < lisSubjects.length; i++) {
      if (i! == lisSubjects.length - 1) res += lisSubjects[i].SubjectName + ', ';
      if (i === lisSubjects.length - 1) {
        res += lisSubjects[i].SubjectName;
      }
    }
    return res;
  };

  const convertClassesToString = (
    listClasses: {
      TutorId: number;
      ClassId: number;
      ClassName: string;
    }[],
  ) => {
    let res = '';
    for (let i = 0; i < listClasses.length; i++) {
      if (i! == listClasses.length - 1) res += listClasses[i].ClassName + ', ';
      if (i === listClasses.length - 1) {
        res += listClasses[i].ClassName;
      }
    }
    return res;
  };

  const convertAreaListToString = (
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

  const handleClick = (id: number | undefined, event: any) => {
    event.stopPropagation();
    if (id && urlParams.get("id"))
      apiPostTutor
        .tutorRegisterPost({
          TutorId: id,
          PostId:  urlParams.get("id"),
        })
        .then(res => {
          if (res.data.Result) {
            setIsShow(true);
          }
        });
  };

  const handleCreateNewTutorProfile = () => {
    navigate(`/tutor/profiles/new?isFrom=choose-profiles`);
    return;
  };

  return (
    <>
      <div className="choose-profile">
        <div className="choose-profile__header">
          <HeaderTitleMobile title="Chọn hồ sơ" />
        </div>
        <div className="choose-profile__main">
          {listTutorProfiles &&
            listTutorProfiles.length > 0 &&
            listTutorProfiles.map((tutor: ITutor, index: number) => {
              return (
                <TutorItem
                  id={tutor?.TutorId || ''}
                  key={tutor?.TutorId}
                  img={tutor?.Avatar || tutorProfileImage}
                  name={tutor?.FullName || ''}
                  subjects={tutor?.TutorSubjectLists ? convertSubjectsToString(tutor?.TutorSubjectLists) : ''}
                  grades={tutor?.TutorClassLists ? convertClassesToString(tutor?.TutorClassLists) : ''}
                  numberStar={tutor?.TotalRating ? Math.floor(tutor?.TotalRating) : 0}
                  addresses={tutor?.TutorAreaLists ? convertAreaListToString(tutor?.TutorAreaLists) : ''}
                  isHorizontal={true}
                  onClick={() => handleClick(tutor.TutorId, event)}
                  clickWhenNotChosen={() => handleClick(tutor.TutorId, event)}
                  className="tutor-wrapper active"
                  layer={
                    tutor?.StatusProcessId === 10
                      ? 'Hồ sơ đang chờ xét duyệt. YOTUTOR sẽ liên lạc với Thầy/ Cô để tiến hành xét duyệt.'
                      : ''
                  }
                  textBtnWhenChosen="Chọn"
                  textBtnWhenNotChosen="Chọn"
                />
              );
            })}
        </div>
        <div className="choose-profile__footer">
          <Button
            type="button"
            className="choose-profile__footer--button"
            width={'302px'}
            onClick={() => handleCreateNewTutorProfile()}
          >
            Tạo hồ sơ mới
          </Button>
        </div>
      </div>
      <ModalSuccess
        isShow={isShow}
        setIsShow={setIsShow}
        text={'Bạn đã đăng ký dạy thành công'}
        clickOutside={() => {
          navigate('/tutor/tutor-class');
        }}
      />
    </>
  );
};
export default ListTutorProfile;
