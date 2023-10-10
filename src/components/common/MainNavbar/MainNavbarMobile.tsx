import './MainNavbarMobile.scss';
import ImageLogoYoot from './../../../assets/img/draft/logoYootMobile.png';
import { SettingIcon } from '../../../assets/svg/SettingIcon';
import { SvgArrow } from '../../../assets/svg/SvgArrow';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';

export const MainNavbarMobile = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isExtanded, setIsExtanded] = useState(false);
  const [countExtand, setCountExtand] = useState(false);
  const history = useNavigate();
  const getSecondFromPathName = () => {
    return window.location.pathname.split('/')[1];
  };
  //console.log("getSecondFromPathName",getSecondFromPathName())
  const hightlightNav = () => {
    return (
      window.location.pathname.split('/')[1] === 'profile' ||
      window.location.pathname.split('/')[2] === 'manage-profile'
    );
  };

  const handle = () => {
    if (getSecondFromPathName() === 'student') {
      history('/student/manage-profile');
    } else if (getSecondFromPathName() == 'tutor') {
      history('/tutor/manage-profile');
    } else {
      history('/profile');
    }
  };

  useEffect(() => {
    //  Vì nút Hamburger nằm ngoài menu sidebar (ref), và khi onclick thì isExtanded = true --> hàm handleClickOutside sẽ
    // được active vì thế dùng biết CountExtand để chặn active hàm handleClickOutside lần đầu tiên
    //    --- ThuyVi ---
    if (isExtanded) {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (setIsExtanded) setIsExtanded(false);
        }
      };
      if (countExtand) {
        document.addEventListener('click', handleClickOutside);
      } else setCountExtand(true);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    } else setCountExtand(false);
  }, [ref, isExtanded, countExtand]);
  return (
    <div className={`navbar-mobile  `} ref={ref}>
      <div className="navbar-mobile__header">
        <div
          className="navbar-mobile__header--logo"
          onClick={() => {
            history('/');
          }}
        >
          <img src={ImageLogoYoot} />
        </div>
        <div
          className="navbar-mobile__header--setting"
          onClick={() => {
            setIsExtanded(true);
          }}
        >
          {<SettingIcon></SettingIcon>}
        </div>
      </div>
      {true && (
        <div className={`navbar-mobile__menu ${isExtanded ? 'navbar-mobile__menu--open' : ''}`}>
          <div
            className="navbar-mobile__menu--close"
            onClick={() => {
              setIsExtanded(false);
            }}
          >
            ĐÓNG
            <span>
              <SvgArrow></SvgArrow>
            </span>
          </div>
          <div className="navbar-mobile__menu--list">
            <div>
              <p>
                <a
                  href="https://yootway.vn"
                  target="_blank"
                  onClick={() => {
                    setIsExtanded(false);
                  }}
                >
                  YOOTWAY
                </a>
              </p>
              <p>
                &#x2022;{' '}
                <a
                  href="https://yootway.vn/account/home"
                  target="_blank"
                  onClick={() => {
                    setIsExtanded(false);
                  }}
                >
                  KẾT QUẢ HƯỚNG NGHIỆP
                </a>
              </p>
            </div>
            <div>
              <p>
                <a
                  href="https://cohoitrungtuyen.vn/"
                  target="_blank"
                  onClick={() => {
                    setIsExtanded(false);
                  }}
                >
                  CƠ HỘI TRÚNG TUYỂN
                </a>
              </p>
              <p>
                &#x2022;{' '}
                <a
                  href="https://cohoitrungtuyen.vn/theo-doi"
                  target="_blank"
                  onClick={() => {
                    setIsExtanded(false);
                  }}
                >
                  THEO DÕI HỒ SƠ
                </a>
              </p>
            </div>
            <div>
              <p
                className="navbar-mobile__menu--active"
                onClick={() => {
                  history('/');
                  setIsExtanded(false);
                }}
              >
                GIA SƯ
              </p>
              <p
                className={`${hightlightNav() ? 'navbar-mobile__menu--active' : ''}`}
                onClick={() => {
                  handle();
                  setIsExtanded(false);
                }}
              >
                &#x2022; HỒ SƠ CÁ NHÂN
              </p>
            </div>
            <div>
              <p>
                <a
                  href="https://yootworld.yoot.vn/"
                  target="_blank"
                  onClick={() => {
                    setIsExtanded(false);
                  }}
                >
                  CƠ HỘI DU HỌC
                </a>
              </p>
            </div>
            <div>
              <p>
                <a
                  href="https://yootway.yoot.vn/huong-nghiep"
                  target="_blank"
                  onClick={() => {
                    setIsExtanded(false);
                  }}
                >
                  THƯ VIỆN HƯỚNG NGHIỆP
                </a>
              </p>
            </div>
            <div
              onClick={() => {
                setIsExtanded(false);
              }}
            >
              <p>LIÊN HỆ</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
