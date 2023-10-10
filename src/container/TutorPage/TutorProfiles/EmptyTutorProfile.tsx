import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import tutorProfileImage from '../../../assets/img/draft/tutorProfileImage.png';
import { Button } from '../../../components/common/Button/Button';

interface IEmptyTutorProfile {
  onClick?: (e:any) => void;
  text?: string;
}

const EmptyTutorProfile = (props: IEmptyTutorProfile) => {
  const { onClick, text = 'Tạo hồ sơ mới' } = props;

  const handleClick = (e:any) => {
    if (onClick) return onClick(e);
    return null;
  };

  return (
    <>
      <div className="tutor-profile">
        <div className="tutor-profile__header">
          <HeaderTitleMobile title="Hồ sơ của bạn" />
        </div>
        <div className="tutor-profile__main">
          <p className="tutor-profile__main--title">Bạn chưa có hồ sơ nào, tạo ngay!</p>
          <div className="tutor-profile__main--image-wrapper">
            <div className="wrapper">
              <img src={tutorProfileImage} alt="Tutor profile image" className="image" />
            </div>
          </div>
        </div>
        <div className="tutor-profile__footer">
          <Button type="button" className="tutor-profile__footer--button" width={'302px'} onClick={(e:any)=>handleClick(e)}>
            {text}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmptyTutorProfile;
