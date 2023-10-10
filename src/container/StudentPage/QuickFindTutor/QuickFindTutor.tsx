import './QuickFindTutort.scss';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { DropdownTick } from '../../../components/common/DropdownTick/DropdownTick';
import { Button } from '../../../components/StudentPage/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiSystem } from '../../../services/axios/apiSystem';
import { doGetListTutor } from '../../../redux/slice/apiSlice/listTutorSlice';
import { useDispatch } from 'react-redux';
import { dataGender } from '../../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { doUpdateDataFindTutor } from '../../../redux/slice/apiSlice/dataFindTutor';
import ModalConfirm from '../../../components/common/ModalConfirm/ModalConfirm';

export const QuickFindTutor = () => {
  const [listSubject, setListSubject] = useState<any>([]);
  const [listGrade, setListGrade] = useState<any>([]);
  const [listFomatTeaching, setListFomatTeaching] = useState<any>([]);
  const [listArea, setListArea] = useState<any>([]);
  const [listLevel, setListLevel] = useState<any>([]);

  const [listChosenSubject, setListChosenSubject] = useState<ListOption>([]);
  const [listChosenGrade, setListChosenGrade] = useState<ListOption>([]);
  const [listChosenFomatTeaching, setListChosenFomatTeaching] = useState<ListOption>([]);
  const [listChosenArea, setListChosenArea] = useState<ListOption>([]);
  const [listChosenSex, setListChosenSex] = useState<ListOption>([]);
  const [listChosenLevel, setListChosenLevel] = useState<ListOption>([]);

  const [isShow, setIsShow] = useState<boolean>(false);

  const history = useNavigate();
  const dispatch = useDispatch();
  const { dataFindTutor } = useSelector((state: RootState) => {
    return state.dataFindTutorReducer;
  });

  const checkNotExistAnyField = () => {
    return (
      !listChosenSubject.length &&
      !listChosenGrade.length &&
      !listChosenFomatTeaching.length &&
      !listChosenArea.length &&
      !listChosenSex.length &&
      !listChosenLevel.length
    );
  };

  const handleSubmit = () => {
    if (checkNotExistAnyField()) {
      setIsShow(true);
    } else {
      dispatch(
        doUpdateDataFindTutor({
          GenderId: listChosenSex,
          AcademicLevelId: listChosenLevel,
          SubjectIds: listChosenSubject,
          ClassIds: listChosenGrade,
          TeachingFormIds: listChosenFomatTeaching,
          AreaIds: listChosenArea,
        }),
      );
      dispatch(
        doGetListTutor({
          CurrentPage: 0,
          Limit: 0,
          Status: '',
          FindString: '',
          GenderId: listChosenSex.length ? listChosenSex[0].key : -1,
          AcademicLevelId: listChosenLevel.length ? listChosenLevel[0].key : 0,
          PostId: 0,
          SubjectIds: listChosenSubject.length
            ? listChosenSubject.map((item: { key: number; value: string }) => item.key)
            : [],
          ClassIds: listChosenGrade.length
            ? listChosenGrade.map((item: { key: number; value: string }) => item.key)
            : [],
          TeachingFormIds: listChosenFomatTeaching.length
            ? listChosenFomatTeaching.map((item: { key: number; value: string }) => item.key)
            : [],
          AreaIds: listChosenArea.length ? listChosenArea.map((item: { key: number; value: string }) => item.key) : [],
        }),
      );
      history('/student/find-tutor/quick-find');
    }
  };
  useEffect(() => {
    setListChosenSubject(dataFindTutor.SubjectIds);
    setListChosenGrade(dataFindTutor.ClassIds);
    setListChosenFomatTeaching(dataFindTutor.TeachingFormIds);
    setListChosenArea(dataFindTutor.AreaIds);
    setListChosenSex(dataFindTutor.GenderId);
    setListChosenLevel(dataFindTutor.AcademicLevelId);
  }, [dataFindTutor]);

  useEffect(() => {
    apiSystem
      .getSubjectSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListSubject(res.data.Content.Subjects);
      });

    apiSystem
      .getClasssSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListGrade(res.data.Content.Classes);
      });

    apiSystem
      .getTeachingFormSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListFomatTeaching(res.data.Content.Forms);
      });

    apiSystem
      .getAreaSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListArea(res.data.Content.Areas);
      });

    apiSystem
      .getAcademicLevelsSelection({
        SearchText: '',
        Limit: 0,
        CurrentPage: 0,
      })
      .then(res => {
        setListLevel(res.data.Content.AcademicLevels);
      });
  }, []);

  // const mapArrayForDropdowmTick = (array: { id: number; title: string; searchtext: string }[]) => {
  //   if (array.length)
  //     return array.map(item => {
  //       return { key: item.id, value: item.title };
  //     });
  //   else return [];
  // };

  // console.log('mapArrayForDropdowmTick', mapArrayForDropdowmTick(listSubject));
  return (
    <div className="quick-find-tutor">
      <HeaderTitleMobile title="Tìm gia sư nhanh" />
      <div className="quick-find-tutor__item quick-find-tutor__subject">
        <p className="quick-find-tutor__label">Môn học</p>
        <DropdownTick
          listChosenOption={listChosenSubject}
          listOption={listSubject.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption={false}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenSubject(listChosenOption);
          }}
          placeholder="Chọn môn học"
        />
      </div>

      <div className="quick-find-tutor__item quick-find-tutor__grade">
        <p className="quick-find-tutor__label">Lớp học</p>
        <DropdownTick
          listChosenOption={listChosenGrade}
          listOption={listGrade.map((item: { Id: number; Name: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Name,
          }))}
          isMultipleOption={true}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenGrade(listChosenOption);
          }}
          placeholder="Lớp học đăng kí dạy"
        />
      </div>

      <div className="quick-find-tutor__item quick-find-tutor__format-teaching">
        <p className="quick-find-tutor__label">Hình thức dạy</p>
        <DropdownTick
          listChosenOption={listChosenFomatTeaching}
          listOption={listFomatTeaching.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption={true}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenFomatTeaching(listChosenOption);
          }}
          placeholder="Chọn hình thức dạy"
        />
      </div>

      <div className="quick-find-tutor__item quick-find-tutor__area">
        <p className="quick-find-tutor__label">Khu vực</p>
        <DropdownTick
          listChosenOption={listChosenArea}
          listOption={listArea.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption={true}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenArea(listChosenOption);
          }}
          placeholder="Chọn khu vực"
        />
      </div>

      <div className="quick-find-tutor__item quick-find-tutor__sex">
        <p className="quick-find-tutor__label">Giới tính</p>
        <DropdownTick
          listChosenOption={listChosenSex}
          listOption={dataGender}
          isMultipleOption={false}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenSex(listChosenOption);
          }}
          // listChosenOption={[]}
          placeholder="Chọn giới tính"
        />
      </div>
      <div className="quick-find-tutor__item quick-find-tutor__level">
        <p className="quick-find-tutor__label">Trình độ</p>
        <DropdownTick
          listChosenOption={listChosenLevel}
          listOption={listLevel.map((item: { Id: number; Title: string; SearchText: string }) => ({
            key: item.Id,
            value: item.Title,
          }))}
          isMultipleOption={false}
          setListChosenOption={(listChosenOption: ListOption) => {
            setListChosenLevel(listChosenOption);
          }}
          placeholder="Chọn trình độ"
        />
      </div>

      <div className="quick-find-tutor__btn">
        <Button
          content="Tìm kiếm"
          onClick={() => {
            handleSubmit();
          }}
        ></Button>
      </div>

      <ModalConfirm
        isShow={isShow}
        text="Vui lòng chọn thông tin để tìm kiếm"
        onClose={() => {
          setIsShow(false);
        }}
        isReturnConfirm={false}
      />
    </div>
  );
};
