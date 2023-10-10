import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProfileContainer } from './ProfileContainer/ProfileContainer';
import { ProfileStep1 } from './ProfileStep1/ProfileStep1';
import './TutorProfile.scss';
import { ProfileStep2 } from './ProfileStep2/ProfileStep2';
import { ProfileStep3 } from './ProfileStep3/ProfileStep3';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { doGetDataform } from '../../../redux/slice/apiSlice/dataForm';
import ModalInform from '../../../components/common/ModalInform/ModalInform';
import {
  doCreateOrUpdateTutorProfile,
  doResetProfile,
  doUpdateProfile,
  doUpdateValidation,
} from '../../../redux/slice/apiSlice/tutorProfiles';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiTutor } from '../../../services/axios/apiTutor';
import { IDataFill, ITutorProfileDetail } from '../../../@types/apiResponse';

export const TutorProfile = () => {
  const [searchParams] = useSearchParams();
  const fromUrl = searchParams.get('isFrom');
  const navigate = useNavigate();
  let { id } = useParams();

  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'CREATE' | 'EDIT'>('CREATE');
  const [isShowModalInform, setIsShowModalInform] = useState<boolean>(false);
  const [isShowModalSuccess, setIsShowModalSuccess] = useState<boolean>(false);

  const { academicLevels, subjects, classes, forms, areas } = useAppSelector(state => state.dataForm);
  const { profileDetail, isValid, isUpSertProfile, isLoading } = useAppSelector(state => state.getTutorProfiles);

  useEffect(() => {
    if (!isValid) setIsShowModalInform(true);
  }, [isValid]);

  useEffect(() => {
    isUpSertProfile && setIsShowModalSuccess(isUpSertProfile);
  }, [isUpSertProfile]);

  useMemo(() => {
    dispatch(
      doCreateOrUpdateTutorProfile({
        isUpSertProfile: false,
      }),
    );
    if (id && id === 'new') {
      dispatch(doResetProfile());

      setMode('CREATE');
    } else {
      dispatch(
        doUpdateValidation({
          isValid: true,
        }),
      );
      apiTutor
        .getInfoTutor({
          TutorId: Number(id),
          IsUpdate: 1,
        })
        .then(res => {
          if (res.data.Content.Tutor) {
            handleUpdateProfile(res.data.Content.Tutor);
          }
        });
      setMode('EDIT');
    }
  }, [id]);

  const refProfileStep1 = useRef<any>();
  const refProfileStep2 = useRef<any>();
  const refProfileStep3 = useRef<any>();

  const ProfileForm = () => {
    if (step === 1) return <ProfileStep1 ref={refProfileStep1} profile={profileDetail} />;
    else if (step === 2) return <ProfileStep2 ref={refProfileStep2} profile={profileDetail} />;
    else return <ProfileStep3 ref={refProfileStep3} profile={profileDetail} mode={mode} />;
  };

  useEffect(() => {
    if (!academicLevels.length || !subjects.length || !classes.length || !forms.length || !areas.length) {
      dispatch(doGetDataform());
    }
  }, []);

  const handlePassStep = () => {
    if (step === 1) return refProfileStep1.current?.handlePassStep();
    else if (step === 2) return refProfileStep2.current?.handlePassStep();
    else return refProfileStep3.current?.handlePassStep();
  };

  const handleBack = () => {
    if (step === 1) return undefined;
    else if (step === 2) return refProfileStep2.current?.handleBack();
    else return refProfileStep3.current?.handleBack();
  };

  const handleOnCloseModalInform = () => {
    setIsShowModalInform(false);
    dispatch(
      doUpdateValidation({
        isValid: true,
      }),
    );
  };

  const handleOnCloseModalSuccess = () => {
    setIsShowModalSuccess(false);
    dispatch(
      doCreateOrUpdateTutorProfile({
        isUpSertProfile: false,
      }),
    );
    if (fromUrl !== null) {
      switch (fromUrl) {
        case 'tutor':
          return navigate(`/${fromUrl}/your-profiles`);
        case 'choose-profiles':
          return navigate(`/tutor/${fromUrl}`);
        default:
          navigate(`/${fromUrl}`);
      }
    }
  };

  const handleUpdateProfile = async (tutorProfile: ITutorProfileDetail) => {
    if (!tutorProfile) return null;
    let arrSubjects: IDataFill[] =
      (await tutorProfile.TutorSubjects) &&
      tutorProfile.TutorSubjects.map(subject => {
        return {
          key: subject.SubjectId,
          value: subject.SubjectName,
        };
      });

    let arrClasses: IDataFill[] =
      (await tutorProfile.TutorClasses) &&
      tutorProfile.TutorClasses.map(tutorClass => {
        return {
          key: tutorClass.ClassId,
          value: tutorClass.ClassName,
        };
      });

    let arrTeachingForms: IDataFill[] =
      (await tutorProfile.TutorTeachingForms) &&
      tutorProfile.TutorTeachingForms.map(teaching => {
        return {
          key: teaching.TeachingFormId,
          value: teaching.TeachingFormName,
        };
      });

    let arrAreas: IDataFill[] =
      (await tutorProfile.TutorAreas) &&
      tutorProfile.TutorAreas.map(area => {
        return {
          key: area.AreaId,
          value: area.AreaName,
        };
      });

    let arrIdentitiesDefault: IDataFill[] =
      (await tutorProfile.TutorIdentitys) &&
      tutorProfile.TutorIdentitys.map(item => {
        return {
          key: item.Id,
          value: item.NameMedia,
        };
      });

    return dispatch(
      doUpdateProfile({
        tutorid: tutorProfile.TutorId,
        fullname: tutorProfile.FullName,
        birthdate: tutorProfile.BirthDate,
        phone: tutorProfile.Phone,
        academiclevel:
          tutorProfile.AcademicLevelId && tutorProfile.AcademicLevelName
            ? [{ key: tutorProfile.AcademicLevelId, value: tutorProfile.AcademicLevelName }]
            : [],
        experience: tutorProfile.Experience,
        totalrating: tutorProfile.TotalRating,
        gender: [{ key: tutorProfile.Gender === 'Nam' ? 0 : 1, value: tutorProfile.Gender }],
        avatar: tutorProfile.Avatar,
        certificated: tutorProfile.IsCertification,
        subjects: arrSubjects,
        classes: arrClasses,
        teachingForms: arrTeachingForms,
        areas: arrAreas,
        degreefiles: await prepareDataObject(tutorProfile.TutorDegrees),
        degreefilesDefault: await prepareDataObjectDefault(tutorProfile.TutorDegrees),
        studentcardfiles: await prepareDataObject(tutorProfile.TutorStudentCards),
        studentcardfilesDefault: await prepareDataObjectDefault(tutorProfile.TutorStudentCards),
        identitybeforefile: tutorProfile.TutorIdentitys[0] && tutorProfile.TutorIdentitys[0].NameMedia,
        identityafterfile: tutorProfile.TutorIdentitys[1] && tutorProfile.TutorIdentitys[1].NameMedia,
        identitiesDefault: arrIdentitiesDefault,
      }),
    );
  };
  const prepareDataObjectDefault = async (arr: any[]) => {
    if (arr.length <= 0) return [];
    let newArr = await arr.map(item => {
      return {
        key: item.Id,
        value: item.NameMedia,
      };
    });
    return newArr;
  };

  const prepareDataObject = async (arr: any[]) => {
    if (arr.length <= 0) return [];
    let newArr = await arr.map(item => {
      return item.NameMedia;
    });
    return newArr;
  };
  return (
    <>
      <div className="tutor-profile">
        <ProfileContainer
          step={step}
          setStep={setStep}
          handlePassStep={handlePassStep}
          handleBack={handleBack}
          mode={mode}
          isLoading={isLoading}
        >
          <ProfileForm />
        </ProfileContainer>
      </div>

      <ModalInform
        isShow={isShowModalInform}
        onClose={handleOnCloseModalInform}
        setIsShow={setIsShowModalInform}
        text={
          step !== 3 && step !== 2
            ? 'Bạn cần cung cấp đầy đủ thông tin theo yêu cầu để tiếp tục nhé.'
            : 'Bạn cần cung cấp đầy đủ hình ảnh theo yêu cầu để tạo hồ sơ nhé.'
        }
      />
      <ModalSuccess
        isShow={isShowModalSuccess}
        clickOutside={handleOnCloseModalSuccess}
        setIsShow={setIsShowModalSuccess}
        text={'Hồ sơ của bạn đã được gửi đi và đang chờ duyệt'}
      />
    </>
  );
};
