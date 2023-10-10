import DOMPurify from 'dompurify';
import { useMemo, useState } from 'react';

import SingleStar from '../../../assets/svg/SingleStar';
import { Avatar } from '../../../components/common/Avatar/Avatar';
import { Button } from '../../../components/common/Button/Button';
import CardInfo from '../../../components/common/CardInfo';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import ModalAuthen from '../../../components/common/ModalAuthen/ModalAuthen';
import TeachingSchedule from '../../../components/common/TeachingSchedule/TeachingSchedule';
import { ModalButtons } from '../../../constants';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiPost } from '../../../services/axios/apiPost';
import './ClassDetails.scss';
import { formatDateToDDMMYYYY } from '../../../helpers/app';
import { checkIsLogined } from '../../../utils/auth';
import { IInfoPost } from '../../../@types/apiResponse';
import avatarDefault from '../../../assets/img/draft/avaDefault.png';

const ClassDetails = () => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState<IInfoPost>();
  const [isLogined, setIsLogined] = useState<boolean>(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const converseArrayToString = (arr: any[]) => {
    let finalText = '';
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
          if (i !== arr.length - 1) {
            finalText += arr[i].Title + ', ';
          } else {
            finalText += arr[i].Title + '.';
          }
        }
      }
    }
    return finalText.slice(0, -1);
  };

  useEffect(() => {
    if (id !== undefined) {
      apiPost
        .getInfoPost({
          PostId: id,
        })
        .then(res => {
          setPost(res.data.Content.Post);
        });
    }
  }, []);

  useEffect(() => {
    checkIsLogined().then(res => {
      setIsLogined(res);
    });
  }, []);

  const handleRegiter = () => {
    if (isLogined) {
      navigate('/tutor/choose-profiles?id=' + id);
    } else {
      setIsShowModal(true);
    }
  };
  const handleLeftButtonClick = () => {
    navigate(`/login`);
  };

  const handleRightButtonClick = () => {
    navigate(`/profile-general/resgister`);
  };

  const checkIsFromFrofiles = () => {
    if(urlParams.get('isFromProfiles') && urlParams.get('isFromProfiles') === 'true') {
      return true;
    }
    return false;
  }
  return (
    <>
      <div className="detail-wrapper">
        <div className="detail-wrapper__header">
          <HeaderTitleMobile title="Chi tiết lớp học" />
        </div>
        <div className="detail-wrapper__main">
          <div className="avatar">
            <Avatar width={'150px'} height={'150px'} borderRadius={40} image={post?.Avatar || avatarDefault} />
            <div className="avatar__title">
              <p>{post?.FullName}</p>
            </div>
          </div>
          <hr />
          <div className="title">
            <SingleStar />
            <p>{`Tìm gia sư ${post?.SubjectText} ${
              post?.PostTeachingForms[0] ? post?.PostTeachingForms[0].Title : ''
            }`}</p>
          </div>
          <CardInfo
            key={1}
            id={1}
            title={`Tìm gia sư ${post?.SubjectText} ${
              post?.PostTeachingForms[0] ? post?.PostTeachingForms[0].Title : ''
            }`}
            schedule={post?.PostSessionWeeks}
            gender={converseArrayToString(post?.PostGenders as any[]) || 'Chưa có'}
            timepost={formatDateToDDMMYYYY(post?.PostDate as string)}
            classes={post?.ClassText || 'Chưa có'}
            name={post?.FullName || 'Chưa có'}
            location={converseArrayToString(post?.PostAreas as any[]) || 'Chưa có'}
          />
          <hr />
          <div className="detail-info">
            <p className="detail-info__title">Chi tiết: </p>
            <p className="detail-info__content">{post?.Description}</p>
          </div>
          <hr />
          <div className="schedule">
            <p className="schedule__title">Các buổi có thể học</p>
            {(post?.IsFlexibleTime || post?.PostSessionWeeks.length === 0)  ? (
              'Linh hoạt'
            ) : (
              <TeachingSchedule
                setListChosenWeekdayMother={() => {}}
                listChosenInitWeekday={post?.PostSessionWeeks.map((item) => {
                  return {
                    weekdayid: item.WeekdayId,
                    sessiondays: item.SessionDays && item.SessionDays.map((i) => ({
                      sessiondayid: i.SessionDayId,
                      sessionday: i.SessionDayText
                    }))
                  }
                })}
                isDisabled={true}
              />
            )}
          </div>
        </div>

        {!checkIsFromFrofiles() && <div className="detail-wrapper__footer">
          <Button type="button" className="detail__button" width={'248px'} onClick={handleRegiter}>
            Đăng ký dạy
          </Button>
        </div>}
      </div>

      <ModalAuthen
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        title={'Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục sử dụng YOTUTOR'}
        buttonTittleLeft={ModalButtons.login}
        buttonTittleRight={ModalButtons.register}
        onLeftClick={handleLeftButtonClick}
        onRightClick={handleRightButtonClick}
      />
    </>
  );
};

export default ClassDetails;
