import React, { useEffect, useState } from 'react';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { HeaderSearchMobile } from '../../../components/common/HeaderSearchMobile/HeaderSearchMobile';
import { CardPost } from '../../../components/common/CardPost/CardPost';
import { apiPost } from '../../../services/axios/apiPost';
import { useDebounce } from '../../../hooks';
import { formatDateToDDMMYYYY } from '../../../helpers/app';
import { useNavigate } from 'react-router-dom';
import './TutorClass.scss'
import ModalAuthen from '../../../components/common/ModalAuthen/ModalAuthen';
import ModalSuccess from '../../HomePage/components/ModalSuccess';
import { ModalButtons } from '../../../constants';
import { checkIsLogined } from '../../../utils/auth';
import { IInfoPostDetail } from '../../../@types/apiResponse';
const TutorCLass = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [listPost, setListPost] = useState<IInfoPostDetail[]>([]);
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const valueSearchDebounce = useDebounce(valueSearch,5)

  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isShowModalSuccess, setIsShowModalSucess] = useState<boolean>(false);
  const history = useNavigate()

  const handleClickPost = (id:number) => {
    if(isLogined) {
      history('/tutor/choose-profiles?id=' + id)
    }
    else {
       setIsShowModal(true);
    }
  }

  useEffect(() => {
    apiPost.getListPost({
      CurrentPage: 0,
      Limit: 10000,
      SubjectIds: [],
      ClassIds: [],
      TeachingFormIds: [],
      AreaIds: [],
      SearchText: valueSearch,
    }).then((res) => {
        setListPost(res.data.Content.Posts)
    });
  }, [valueSearchDebounce]);

  useEffect(() => {
    checkIsLogined().then(res => {
      setIsLogined(res);
    });
  }, []);


  return (
    <div className="tutor-class">
      <HeaderTitleMobile title="Lớp cần gia sư" />
      <HeaderSearchMobile onChange={setValueSearch} placeholder='Tìm tin đăng, môn học' onClick={() => {
        history('/tutor/filter-post')
      }}/>
      <h3 className="tutor-class__title">{listPost.length} lớp</h3>
      <div className="tutor-class__list-post">
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
              history('/tutor/class-details/' + post.Id)
            }}
            isChosen = {post?.IsChooseFinal}
          />
        ))}
      </div>
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

      <ModalSuccess
        isShow={isShowModalSuccess}
        text="Bạn đã đăng ký dạy thành công"
        setIsShow={setIsShowModalSucess}
      />
    </div>
  );
};

export default TutorCLass;
