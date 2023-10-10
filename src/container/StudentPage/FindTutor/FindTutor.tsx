import './FindTutor.scss';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { HeaderSearchMobile } from '../../../components/common/HeaderSearchMobile/HeaderSearchMobile';
import { IntroCard } from '../../../components/StudentPage/FindTuTor/IntroCard/IntroCard';
import IntroImg from '../../../assets/img/draft/intro-card.png';
import { ListTutor } from '../../../components/StudentPage/ListTutor/ListTutor';
import { ListSubject } from '../../../components/StudentPage/ListSubject/ListSubject';
import { ListGenaral } from '../../../components/common/ListGeneral/ListGenaral';
import { useNavigate } from 'react-router-dom';
import { checkIsLogined } from '../../../utils/auth';
import { useState, useEffect } from 'react';
import ModalAuthen from '../../../components/common/ModalAuthen/ModalAuthen';
import { ModalButtons } from '../../../constants';
import { apiTutor } from '../../../services/axios/apiTutor';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import { apiPostTutor } from '../../../services/axios/apiPostTutor';
import { useDebounce } from '../../../hooks';
import { useDispatch } from 'react-redux';

import { doClearDataFindTutor } from '../../../redux/slice/apiSlice/dataFindTutor';

export const FindTutor = () => {
  const history = useNavigate();
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowModalSuccess, setIsShowModalSucess] = useState<boolean>(false);
  const [listOnlineTutor, setListOnlineTutor] = useState<ITutor[]>([]);
  const [listOffTutor, setListOffTutor] = useState<ITutor[]>([]);
  const [listSubject, setListSubject] = useState<SubjectItem[]>([]);
  const [valueSearch, setValueSearh] = useState<string>('');
  const valueSearchDebounce = useDebounce(valueSearch, 5);

  const dispatch = useDispatch();

  const handleClickPostNews = (e: any) => {
    if (isLogined) {
      setIsShowModal(false);
      history('/student/post-find-tutor/post');
    } else {
      e.stopPropagation();
      setIsShowModal(true);
    }
  };

  const registerTutor = (id: number | string, e: any) => {
    if (isLogined) {
      apiPostTutor
        .userRegisterPost({
          PostId: 0,
          TutorId: +id,
        })
        .then(res => {
          if (res.data.Result) setIsShowModalSucess(true);
          else setIsShowModalSucess(false);
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
      //e.stopPropagation();
      setIsShowModal(true);
    }
  };
  const navigateToSubjectResult = (id: number) => {
    history('/student/find-tutor/subject?id=' + id);
  };

  useEffect(() => {
    apiTutor
      .getListTutor({
        CurrentPage: 0,
        Limit: 0,
        Status: '',
        FindString: valueSearchDebounce,
        GenderId: -1,
        AcademicLevelId: 0,
        PostId: 0,
        SubjectIds: [],
        ClassIds: [],
        TeachingFormIds: [20],
        AreaIds: [],
      })
      .then(res => {
        setListOnlineTutor(res.data.Content.Tutors);
      });

    apiTutor
      .getListTutor({
        CurrentPage: 0,
        Limit: 0,
        Status: '',
        FindString: valueSearchDebounce,
        GenderId: -1,
        AcademicLevelId: 0,
        PostId: 0,
        SubjectIds: [],
        ClassIds: [],
        TeachingFormIds: [10],
        AreaIds: [],
      })
      .then(res => {
        setListOffTutor(res.data.Content.Tutors);
      });

    apiTutor.getListTutorFollowSubject().then(res => {
      setListSubject(res.data.Content.Subjects);
    });
  }, [valueSearchDebounce]);

  useEffect(() => {
    checkIsLogined().then(res => {
      setIsLogined(res);
    });
  }, []);

  return (
    <div className="find-tutor">
      <div className="find-tutor___title">
        <HeaderTitleMobile title="Tìm kiếm gia sư" isShowNoti={true} numberUnread={0} />
      </div>

      <div className="find-tutor___search">
        <HeaderSearchMobile
          onClick={() => {
            dispatch(doClearDataFindTutor())
            history('/student/quick-find-tutor');
          }}
          onChange={setValueSearh}
          placeholder="Tìm gia sư theo môn học, lớp..."
        />
      </div>

      <div className="find-tutor__intro">
        <IntroCard
          title="Kết nối học viên với hàng trăm gia sư"
          buttonContent="Đăng nhu cầu"
          img={IntroImg}
          onClick={handleClickPostNews}
        />
      </div>

      <div className="find-tutor__list-online">
        <ListGenaral
          children={<ListTutor listTutor={listOnlineTutor} onClick={registerTutor} />}
          title={'Gia sư online'}
          isShow={true}
          onClick={() => {
            history(`/student/find-tutor/online`);
          }}
        />
      </div>

      <div className="find-tutor__list-off">
        <ListGenaral
          children={<ListTutor listTutor={listOffTutor} onClick={registerTutor} />}
          title={'Gia sư tại nhà'}
          isShow={true}
          onClick={() => {
            history(`/student/find-tutor/offline`);
          }}
        />
      </div>

      <div className="find-tutor__list-subject">
        <ListGenaral
          children={<ListSubject listSubject={listSubject} onClick={navigateToSubjectResult} />}
          title={'Gia sư theo môn học'}
        />
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
        text="Lời mời dạy của bạn đã được gửi thành công. YOTUTOR sẽ xem và phản hồi bạn sớm nhất nhé!"
        setIsShow={setIsShowModalSucess}
      />
    </div>
  );
};
