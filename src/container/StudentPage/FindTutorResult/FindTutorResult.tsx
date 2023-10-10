import './FindTutorResult.scss';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { HeaderSearchMobile } from '../../../components/common/HeaderSearchMobile/HeaderSearchMobile';
import { useParams } from 'react-router-dom';
import { ListGenaral } from '../../../components/common/ListGeneral/ListGenaral';
import { ListTutor } from '../../../components/StudentPage/ListTutor/ListTutor';
import { NoResult } from '../../../assets/svg/NoResult';
import { Button } from '../../../components/StudentPage/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiTutor } from '../../../services/axios/apiTutor';
import ModalAuthen from '../../../components/common/ModalAuthen/ModalAuthen';
import { ModalButtons } from '../../../constants';
import { checkIsLogined } from '../../../utils/auth';
import { apiPostTutor } from '../../../services/axios/apiPostTutor';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import { useDebounce } from '../../../hooks';
import { useSelector, useDispatch } from 'react-redux';

import { doClearDataFindTutor } from '../../../redux/slice/apiSlice/dataFindTutor';

export const FindTutorResult = () => {
  const { id } = useParams();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const [isShowModalSuccess, setIsShowModalSucess] = useState<boolean>(false);
  const [listTutor, setListTutor] = useState<ITutor[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [valueSearch, setValueSearh] = useState<string>('');
  const valueSearchDebounce = useDebounce(valueSearch,5)

  const dispatch = useDispatch();

  const {listTutor: listTutorReducer} = useSelector((state:any) => {
    return state.getListTutorReducer
    })


  const rederTitle = (id: string | undefined) => {
    if (id) {
      if (id === 'online') {
        return 'Gia sư online';
      } else if (id === 'offline') {
        return 'Gia sư tại nhà';
      } else if (id === 'subject') {
        return 'Gia sư theo môn học';
      } else {
        return 'Kết quả tìm kiếm';
      }
    }
    return '';
  };

  

  const registerTutor = (id: number | string, e: any) => {
    if (isLogined) {
      
      apiPostTutor.userRegisterPost({
        PostId: 0,
        TutorId: +id
      }).then((res) => {
        if(res.data.Result) setIsShowModalSucess(true);
        else setIsShowModalSucess(false);
      })
      .catch((error) => {
        console.log("error", error)
      })
    } else {
      //e.stopPropagation();
      setIsShowModal(true);
    }
  };


  useEffect(() => {
    checkIsLogined().then(res => {
      setIsLogined(res);
    });
  }, []);

  useEffect(() => {
    if (id === 'online') {
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
          AreaIds: []
        })
        .then(res => {
          setListTutor(res.data.Content.Tutors);
        });
    } else if (id === 'offline') {
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
          AreaIds: []
        })
        .then(res => {
          setListTutor(res.data.Content.Tutors);
        });
    }

    else if(id === 'subject') {
      apiTutor
        .getListTutor({
          CurrentPage: 0,
          Limit: 0,
          Status: '',
          FindString: valueSearchDebounce,
          GenderId: -1,
          AcademicLevelId: 0,
          PostId: 0,
          SubjectIds: [urlParams.get('id')],
          ClassIds: [],
          TeachingFormIds: [],
          AreaIds: []
        })
        .then(res => {
          setListTutor(res.data.Content.Tutors);
        });
    }
  }, [valueSearchDebounce]);
  useEffect(() => {
    if(id === 'quick-find') {
      setListTutor(listTutorReducer)
    }
  },[listTutorReducer])
  const history = useNavigate();

  const renderTitleList = () => {
    if (id === 'online' || id === 'offline' || id === 'subject') {
      return listTutor.length + ' gia sư';
    } else {
      return 'Kết qua phù hợp: ' + listTutor.length;
    }
  };

  const renderResult = () => {
    if (listTutor.length) {
      return (
        <>
          {id !== "quick-find" && <div className="find-tutor-result__search">
            <HeaderSearchMobile
              placeholder="Tìm gia sư theo môn học, lớp"
              onClick={() => {
                dispatch(doClearDataFindTutor())
                history('/student/quick-find-tutor');
              }}
              onChange={setValueSearh}
            />
          </div>}

          <div className="find-tutor-result__list-tutor">
            <ListGenaral
              children={<ListTutor listTutor={listTutor} isHorizontal={true} onClick={registerTutor}/>}
              title={renderTitleList()}
              isShow={false}
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="find-tutor-result__no-result">
            <NoResult />
          </div>
          <div className="find-tutor-result__btn">
            <Button
              content="Thử lại"
              onClick={() => {
                dispatch(doClearDataFindTutor());
                history('/student/quick-find-tutor');
              }}
            ></Button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="find-tutor-result">
      <div className="find-tutor-result__title">
        <HeaderTitleMobile title={rederTitle(id)} />
      </div>
      {renderResult()}
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
