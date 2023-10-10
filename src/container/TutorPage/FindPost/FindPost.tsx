import React, { useState } from 'react';
import { HeaderSearchMobile } from '../../../components/common/HeaderSearchMobile/HeaderSearchMobile';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { IntroCard } from '../../../components/StudentPage/FindTuTor/IntroCard/IntroCard';
import IntroImg from '../../../assets/img/draft/intro-card.png';
import './FindPost.scss';
import { ListGenaral } from '../../../components/common/ListGeneral/ListGenaral';
import { CardPost } from '../../../components/common/CardPost/CardPost';
import { useEffect } from 'react';
import { apiPost } from '../../../services/axios/apiPost';
import { formatDateToDDMMYYYY } from '../../../helpers/app';
import { useDebounce } from '../../../hooks';
import { checkIsLogined } from '../../../utils/auth';
import ModalAuthen from '../../../components/common/ModalAuthen/ModalAuthen';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import { ModalButtons } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { IInfoPostDetail } from '../../../@types/apiResponse';

export const FindPost = () => {
  const [valueSearch, setValueSearch] = useState('');
  const [listPost, setListPost] = useState<IInfoPostDetail[]>([]);
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const valueSearchDebounce = useDebounce(valueSearch, 5);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const history = useNavigate();

  const handleClickPost = (id: number) => {
    if (isLogined) {
      history('/tutor/choose-profiles?id=' + id);
    } else {
      setIsShowModal(true);
    }
  };
  useEffect(() => {
    apiPost
      .getListPost({
        CurrentPage: 0,
        Limit: 5,
        SubjectIds: [],
        ClassIds: [],
        TeachingFormIds: [],
        AreaIds: [],
        SearchText: valueSearch,
      })
      .then(res => {
        setListPost(res.data.Content.Posts);
      });
  }, [valueSearchDebounce]);

  useEffect(() => {
    checkIsLogined().then(res => {
      setIsLogined(res);
    });
  }, []);

  return (
    <div className="find-post">
      <HeaderTitleMobile title="Tìm kiếm tin đăng" isShowNoti numberUnread={0} />
      <HeaderSearchMobile
        onChange={setValueSearch}
        placeholder="Tìm tin đăng, môn học..."
        onClick={() => {
          history('/tutor/filter-post');
        }}
      />
      <IntroCard title="Tạo hồ sơ ngay để tìm lớp học phù hợp" buttonContent="Tạo hồ sơ" img={IntroImg} onClick={() => {
        if(!isLogined) setIsShowModal(true)
        else history('/tutor/profiles/new?isFrom=tutor')
      }}/>
      <ListGenaral
        title="Lớp cần gia sư"
        isShow
        onClick={() => {
          history('/tutor/tutor-class');
        }}
      >
        {listPost.map(post => (
          <CardPost
            key={post.Id}
            id={post?.Id}
            title={`Tìm gia sư ${post?.SubjectText} ${
              post?.PostTeachingForms[0] ? post?.PostTeachingForms[0].Title : ''
            }`}
            schedule={post?.PostSessionWeeks}
            timepost={formatDateToDDMMYYYY(post?.PostDate)}
            name={post?.FullName}
            classes={post?.ClassText ? post?.ClassText : 'Chưa có'}
            location={post?.PostAreas[0] ? (post.PostAreas[0].Title as string) : 'Chưa có'}
            onClick={() => {
              handleClickPost(post.Id);
            }}
            onClickTotal={() => {
              history('/tutor/class-details/' + post.Id);
            }}
            isChosen = {post?.IsChooseFinal}
          />
        ))}
      </ListGenaral>

      <ModalAuthen
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        title={'Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục sử dụng YOTUTOR'}
        buttonTittleLeft={ModalButtons.login}
        buttonTittleRight={ModalButtons.register}
        onRightClick={() => {
          history('/profile-general/register');
        }}
        onLeftClick={() => {
          history('/login');
        }}
      />
    </div>
  );
};
