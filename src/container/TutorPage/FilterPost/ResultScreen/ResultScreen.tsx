import React, { useState } from 'react';
import { Button } from '../../../../components/common/Button/Button';
import { CardPost } from '../../../../components/common/CardPost/CardPost';
import { HeaderTitleMobile } from '../../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { ImgNoResult } from '../../../../constants';
import { formatDateToDDMMYYYY } from '../../../../helpers/app';
import ModalAuthen from '../../../../components/common/ModalAuthen/ModalAuthen';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { checkIsLogined } from '../../../../utils/auth';
import './ResultScreen.scss';
import { ModalButtons } from '../../../../constants';
interface IResultScreen {
  goBack: () => void;
  listPost: any;
}

export const ResultScreen: React.FC<IResultScreen> = ({ goBack, listPost }) => {
  console.log("listPost",listPost)
  //const [listResult] = useState(listPost)
  const history = useNavigate()
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const handleClickPost = (id:number) => {
    if(isLogined) {
      history('/tutor/choose-profiles?id=' + id)
    }
    else {
       setIsShowModal(true);
    }
  }
  useEffect(() => {
    checkIsLogined().then(res => {
      setIsLogined(res);
    });
  }, []);


  const RenderNoReSult = () => {
    return (
      <div className="result-screen__no-res">
        <div className="result-screen__no-res__alert">
          <img src={ImgNoResult} />
          <p>Không có kết quả phù hợp</p>
        </div>
        <Button
          className="result-screen__no-res__try-again"
          onClick={() => {
            goBack();
          }}
        >
          Thử lại
        </Button>
      </div>
    );
  };

  const RenderResult = () => {
    return (
      <>
        <p className="result-screen__num-res">Kết quả phù hợp: {listPost.length}</p>
        <div className="result-screen__list-res">
          {listPost.map((post:any) => (
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
              location={post?.PostAreas[0] ? post?.PostAreas[0].Title : 'Chưa có'}
              onClick={() => {
                  handleClickPost(post.Id)
              }}
              onClickTotal={() => {
                history('/tutor/class-details/' + post.Id)
              }}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="result-screen">
      <HeaderTitleMobile title="Kết quả tìm kiếm" />
      {listPost.length ? <RenderResult /> : <RenderNoReSult />}
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
