import { Button } from '../Button/Button';
import './CardTutorProfile.scss';

const CardTutorProfile = () => {
  return (
    <div className="profile-wrapper">
      <div className="profile-wrapper__left-side">
        <div className="profile-wrapper__left-side--image-wrapper">
          <img src="" alt="" />
        </div>
        <div className="profile-wrapper__left-side--rating-star"></div>
        <div className="profile-wrapper__left-side-button">
          <Button>Chọn</Button>
        </div>
      </div>
      <div className="profile-wrapper__right-side"></div>
    </div>
  );
};

export default CardTutorProfile;
