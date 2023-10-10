import { useNavigate } from 'react-router-dom';
import updateIcon from '../../../assets/img/draft/updateProfle.png';
import { BookAvatar } from '../../../assets/svg/BookAvatar';
import { GradeAvatar } from '../../../assets/svg/GradeAvatar';
import { LocaAvatar } from '../../../assets/svg/LocaAvatar';
import { PersonAvatar } from '../../../assets/svg/PersonAvatar';
import { converseArrayGetFinalTextToString } from '../../../utils';
import { ListStar } from '../../StudentPage/ListStar/ListStar';
import ToggleSwitch from '../ToggleSwitch';
import './CardProfile.scss';
import { apiTutor } from '../../../services/axios/apiTutor';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { doUpdateProfile } from '../../../redux/slice/apiSlice/tutorProfiles';
import { IDataFill } from '../../../@types/apiResponse';
export interface ISubject {
  TutorId: number;
  SubjectId: number;
  SubjectName: string;
}

interface IDataObject {
  id: number;
  tutorid: number;
  namemedia: string;
  thumbnailmedia: string;
  typediplomaid: number;
  typediplomaname: string;
}

export interface IArea {
  TutorId: number;
    AreaId: number;
    AreaName: string;
}

export interface IClass {
  TutorId: number;
    ClassId: number;
    ClassName: string;
}

export type ISubjects = ISubject[];
export type IAreas = IArea[];
export type IClasses = IClass[];

interface ICardProfile {
  profileImage?: string;
  isOpenProfile?: boolean;
  onSetIsOpenProfile?: any;
  name?: string;
  subjects?: ISubjects;
  grades?: IClasses;
  addresses?: IAreas;
  userid?: number;
  tutorid?: number;
  totalrating?: number;
  currentProfile?: ITutor;
  statusProcessId?: number
}

const CardProfile = (props: ICardProfile) => {
  const {
    profileImage,
    isOpenProfile,
    onSetIsOpenProfile,
    name,
    subjects,
    grades,
    addresses,
    tutorid,
    totalrating,
    statusProcessId,
    currentProfile,
  } = props;
  const { profileDetail } = useAppSelector(state => state.getTutorProfiles);

  const navigate = useNavigate();
  
  const handleSelectCardProfile = (TutorId: any) => {
    navigate(`/student/tutor-detail-info/${TutorId}?delete-profile=1`);
  };

  const handleEditTutorProfile = () => {
    navigate(`/tutor/profiles/${tutorid}?isFrom=tutor`);
  };

  

  return (
    <>
      <div className="card-profile">
        <div className="card-profile__left">
          <div className="card-profile__left--image">
            <img src={profileImage} alt="" />
          </div>
          <div className="card-profile__left--star">
            <ListStar score={totalrating} number={totalrating as number} />
          </div>
          <div className="card-profile__left--toggle">
            <div className="label">{isOpenProfile ? 'Mở hồ sơ' : 'Đóng hồ sơ'}</div>
            <div className="toggle">
              <ToggleSwitch isToggled={isOpenProfile} onToggle={() => {
                if(statusProcessId !== 10) onSetIsOpenProfile(!isOpenProfile, tutorid)
                }} />
            </div>
          </div>
        </div>
        <div className="card-profile__right" onClick={() => handleSelectCardProfile(tutorid)}>
          <div className="content">
            <div className="content__detail content__detail--name">
              <div>
                <PersonAvatar width="14.2px" height="14.2px" />
              </div>
              <span>{name}</span>
            </div>

            <div className="content__detail content__detail--subjects">
              <div>
                <BookAvatar width="14.2px" height="14.2px" />
              </div>
              <span>{converseArrayGetFinalTextToString(subjects)}</span>
            </div>

            <div className="content__detail content__detail--grades">
              <div>
                <GradeAvatar width="14.2px" height="14.2px" />
              </div>
              <span>{converseArrayGetFinalTextToString(grades)}</span>
            </div>

            <div className="content__detail content__detail--addresses">
              <div>
                <LocaAvatar width="14.2px" height="14.2px" />
              </div>
              <span>{converseArrayGetFinalTextToString(addresses)}</span>
            </div>
          </div>
        </div>
        <div className="card-profile__edit" onClick={() => handleEditTutorProfile()}>
          <img src={updateIcon} alt="" />
        </div>
      </div>
      {statusProcessId === 10 && (
        <div className="card-profile__inform">
          <p className="card-profile__inform--text">
            *Hồ sơ đang chờ xét duyệt. YOTUTOR sẽ liên lạc với Thầy/ Cô để tiến hành xét duyệt.
          </p>
        </div>
      )}
    </>
  );
};

export default CardProfile;
