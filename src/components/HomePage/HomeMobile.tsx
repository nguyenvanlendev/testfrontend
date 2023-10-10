import React, { useState } from 'react';
import './HomeMobile.scss';
import contactInfo from '../../assets/img/draft/contact-info.png';
// import studentBG from '../../assets/img/draft/student-background.png';
import studentBG from '../../assets/img/draft/StudentRole.png';
import tutorBG from '../../assets/img/draft/TutorRole.png';
// import tutorBG from '../../assets/img/draft/tutor-background.png';
import { Button } from '../common/Button/Button';
import { Notification } from '../../assets/svg/Notification';
import { useNavigate } from 'react-router-dom';
import { HeaderSearchMobile } from '../common/HeaderSearchMobile/HeaderSearchMobile';
import { Avatar } from '../common/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { checkIsLogined } from '../../utils/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doGetCurrentUser } from '../../redux/slice/apiSlice/currentUserSlice';
import avatarDefault from '../../assets/img/draft/avaDefault.png';
import { doGetNumNoti } from '../../redux/slice/apiSlice/numNotifSlice';

const HomeMobile = () => {
  const [isLogin, setIsLogin] = useState(false);

  const { dataUser } = useSelector((state: RootState) => {
    return state.currentUserReducer;
  });

  const { numNoti } = useSelector((state: RootState) => {
    return state.numNotiReducer;
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/tutor/profiles/new?isFrom=tutor');
  };

  useEffect(() => {
    checkIsLogined()
      .then(res => {
        setIsLogin(res);
        if (res) {
          dispatch(doGetCurrentUser());
          dispatch(doGetNumNoti());
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home-mobile">
      <div className="home-mobile-container">
        {!isLogin ? (
          <div className="home-mobile-header">
            <Avatar
              width={'50px'}
              height={'50px'}
              borderRadius={15}
              filter={'drop-shadow(0px 3.33333px 10px rgba(0, 0, 0, 0.25))'}
              className="home-mobile-header__avatar"
            />
            <Button className="btn-login" children={'Đăng nhập'} onClick={() => navigate('/login')} />
            <Button className="btn-signin" children={'Đăng ký'} onClick={() => navigate('/profile-general/register')} />
          </div>
        ) : (
          <div className="home-mobile-header login">
            <div className="home-mobile-header__account-info">
              <Avatar
                image={dataUser?.ThumbnailAvatar || avatarDefault}
                width={'50px'}
                height={'50px'}
                borderRadius={15}
                filter={'drop-shadow(0px 3.33333px 10px rgba(0, 0, 0, 0.25))'}
                className="home-mobile-header__avatar"
                onClick={() => navigate('/profile')}
              />
              <div className="home-mobile-header__username">
                Hi, <span>{dataUser?.FullName}</span> 👋
              </div>
            </div>
            <div className="home-mobile-header__notification" onClick={() => navigate('/notification')}>
              <Notification />
              {numNoti ? <div className="notification-number">{numNoti}</div> : ''}
            </div>
          </div>
        )}
        <div className="home-mobile-content">
          <img src={contactInfo} alt="" className="home-mobile-content__contact-info" />
          <div className="home-mobile-content__student-role">
            <img src={studentBG} alt="" onClick={() => navigate('/student/find-tutor')} />
            {/* <HeaderSearchMobile placeholder="Tìm kiếm" isShowSearchOpt={false} /> */}
          </div>
          <div className="home-mobile-content__tutor-role">
            <img src={tutorBG} alt="" onClick={() => navigate('/tutor')} />
            {/* <Button className="btn-create-profile" children={'Tạo hồ sơ ngay'} onClick={() => navigate('/tutor')} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMobile;
