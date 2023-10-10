import React from 'react';
import './HeaderTileMobile.scss';
// import BackIcon from './../../../assets/img/draft/back-icon.png';
import { Noti } from '../../../assets/svg/Noti';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { useDispatch } from 'react-redux';
import { doClearNumNoti, doGetNumNoti } from '../../../redux/slice/apiSlice/numNotifSlice';
import { checkIsLogined } from '../../../utils/auth';
import { BackIcon } from '../../../assets/svg/BackIcon';

export const HeaderTitleMobile: React.FC<HeaderTiTleMobile> = ({ title, isShowNoti, numberUnread, onClick }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { numNoti } = useSelector((state: RootState) => {
    return state.numNotiReducer;
  });

  useEffect(() => {
    checkIsLogined()
      .then(res => {
        if (res) {
          dispatch(doGetNumNoti());
        } else {
          dispatch(doClearNumNoti());
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="header-title-mobile">
      <div className="header-title-mobile__back">
        <div
          className="back-icon"
          onClick={() => {
            if (onClick) onClick(true);
            else history(-1);
          }}
        >
          <BackIcon />
        </div>
        <div className="header-title-mobile__title">{title}</div>
      </div>

      {isShowNoti && (
        <div className="header-title-mobile__noti">
          <div className="header-title-mobile__noti--icon" onClick={() => history('/notification')}>
            {<Noti />}
          </div>
          {numNoti ? <span>{numNoti}</span> : ''}
        </div>
      )}
    </div>
  );
};
