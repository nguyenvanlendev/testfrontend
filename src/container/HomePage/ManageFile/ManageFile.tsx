import './ManageFile.scss';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { Avatar } from '../../../components/common/Avatar/Avatar';
import avaDefault from '../../../assets/img/draft/avaDefault.png';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { checkIsLogined } from '../../../utils/auth';
import { logout } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doGetCurrentUser } from '../../../redux/slice/apiSlice/currentUserSlice';
import { Button } from '../../../components/common/Button/Button';
import ModalConfirm from '../../../components/common/ModalConfirm/ModalConfirm';

export const ManageFile = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { dataUser } = useSelector((state: RootState) => {
    return state.currentUserReducer;
  });
  const getSecondFromPathName = () => {
    return window.location.pathname.split('/')[1];
  };

  const renderSecondButton = () => {
    if (getSecondFromPathName() === 'student') {
      return (
        <Button
          children="Tin đăng của bạn"
          onClick={() => {
            history('/student/new-post');
          }}
        />
      );
    } else {
      return (
        <Button
          children="Hồ sơ của bạn"
          onClick={() => {
            history('/tutor/your-profiles');
          }}
        />
      );
    }
  };
  useEffect(() => {
    checkIsLogined().then(res => {
      setIsLogined(res);
      if (res) dispatch(doGetCurrentUser());
    });
  }, []);

  return (
    <div className="manage-file">
      <HeaderTitleMobile title="Hồ sơ của bạn" />
      <div className="manage-file__avatar">
        <Avatar
          width={'112px'}
          height={'112px'}
          borderRadius={45}
          filter={'drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25))'}
          image={isLogined && (dataUser?.Avatar || avaDefault)}
        />
      </div>
      {isLogined && (
        <>
          <div className="manage-file__name">{dataUser?.FullName}</div>
          <div className="manage-file__role">{getSecondFromPathName() === 'student' ? 'Học viên' : 'Gia sư'}</div>
        </>
      )}
      <div className="manage-file__menu">
        {isLogined ? (
          <>
            <div className="manage-file__menu--logined">
              <Button
                children="Thông tin cá nhân"
                onClick={() => {
                  history('/profile');
                }}
              ></Button>
              {renderSecondButton()}
              <Button
                children="Đăng xuất"
                onClick={(e: any) => {
                  //
                  e.stopPropagation();
                  setIsShow(true);
                }}
              ></Button>
            </div>
            <ModalConfirm
              isShow={isShow}
              setIsShow={setIsShow}
              text={'Thông tin của bạn sẽ được lưu lại cho lần đăng nhập tiếp theo. Bạn sẽ chắc chắn muốn thoát?'}
              onClose={() => setIsShow(false)}
              isReturnConfirm={false}
              handleSave={() => {
                logout();
                history('/');
              }}
            ></ModalConfirm>
          </>
        ) : (
          <div className="manage-file__menu--un-logined">
            <Button
              width={130}
              children="Đăng nhập"
              onClick={() => {
                history('/login');
              }}
            />
            <Button
              width={130}
              children="Đăng ký"
              onClick={() => {
                history('/profile-general/register');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
