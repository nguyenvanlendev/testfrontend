import React, { useEffect, useImperativeHandle, useState } from 'react';
import './ProfileStep3.scss';
import { ImageFrame } from '../../../../components/common/ImageFrame/ImageFrame';
import { useAppDispatch } from '../../../../redux';
import {
  doCreateTutor,
  doUpdateTutor,
  doCreateOrUpdateTutorProfile,
  doUpdateProfile,
  doUpdateValidation,
} from '../../../../redux/slice/apiSlice/tutorProfiles';
import moment from 'moment';
import ModalInform from '../../../../components/common/ModalInform/ModalInform';
import { isFileImage } from '../../../../utils';
import { responseAPI } from '../../../../services/axios/axiosBase';

interface IProfileStep3 {
  profile: ITutorProfileDetail;
  mode: 'CREATE' | 'EDIT';
  ref: any;
}

export const ProfileStep3: React.FC<IProfileStep3> = React.forwardRef(({ profile, mode }, ref) => {
  const dispatch = useAppDispatch();
  //state
  const [certificates, setCertificates] = useState<any[] | any>([]);
  const [studentIdCard, setStudentIdCard] = useState<any[] | any>([]);
  const [idCardFrontside, setIdCardFrontside] = useState<File | string>('');
  const [idCardBackside, setIdCardBackside] = useState<File | string>('');
  const [certificatesDefault, setCertificatesDefault] = useState<any[]>([]);
  const [studentcardfilesDefault, setStudentcardfilesDefault] = useState<any[]>([]);
  const [identitiesDefault, setIdentitiesDefault] = useState<any[]>([]);

  const [arrIdentitiesDeteted, setArrIdentitiesDeteted] = useState<number[]>([]);

  useEffect(() => {
    if (profile) {
      profile.degreefilesDefault && setCertificatesDefault(profile.degreefilesDefault);
      profile.studentcardfilesDefault && setStudentcardfilesDefault(profile.studentcardfilesDefault);
      profile.identitiesDefault && setIdentitiesDefault(profile.identitiesDefault);
      profile.degreefiles && setCertificates(profile.degreefiles as any[]);
      profile.studentcardfiles && setStudentIdCard(profile.studentcardfiles as any[]);
      profile.identitybeforefile && setIdCardFrontside(profile.identitybeforefile);
      profile.identityafterfile && setIdCardBackside(profile.identityafterfile);
    }
  }, [profile]);

  useEffect(() => {
    handleChangeIdentitiesCard();
  }, [idCardFrontside, idCardBackside]);

  useImperativeHandle(ref, () => ({
    handlePassStep: async () => {
      const isValid = handleValidateData();
      await handleUpdateProfile();
      if (!isValid) {
        dispatch(
          doUpdateValidation({
            isValid: false,
          }),
        );
        return false;
      }

      dispatch(
        doUpdateValidation({
          isValid: true,
        }),
      );

      return mode === 'CREATE' ? await handleCreateTutorProfile() : await handleUpdateTutorProfile();
    },
    handleBack: async () => {
      handleUpdateProfile();
    },
  }));

  const handleUpdateProfile = async () => {
    return await dispatch(
      doUpdateProfile({
        degreefiles: certificates,
        studentcardfiles: studentIdCard,
        identitybeforefile: idCardFrontside,
        identityafterfile: idCardBackside,
      }),
    );
  };

  const handleValidateData = () => {
    let isCertificates =
      (Array.isArray(certificates) && certificates.length > 0) || isFileImage(certificates as File) ? true : false;
    let isStudentIdCard =
      (Array.isArray(studentIdCard) && studentIdCard.length > 0) || isFileImage(studentIdCard as File) ? true : false;
    if (isCertificates && isStudentIdCard && idCardFrontside && idCardBackside) {
      return true;
    } else {
      return false;
    }
  };
  const handleCreateTutorProfile = () => {
    const formData = new FormData();
    formData.append('Fullname', profile.fullname);
    formData.append('BirthDate', moment(profile.birthdate).format('YYYY-MM-DD'));
    formData.append('Phone', profile.phone);
    if (profile.academiclevel.length) {
      formData.append('AcademicLevelId', `${profile.academiclevel[0].key}`);
    }
    formData.append('Experience', profile.experience);
    if (profile.certificated) formData.append('IsCertificated', `${profile.certificated}`);

    profile.subjects.forEach((item, index) => {
      return formData.append(`SubjectIds[${index}]`, `${item.key}`);
    });

    profile.classes.forEach((item, index) => {
      return formData.append(`ClassIds[${index}]`, `${item.key}`);
    });

    profile.teachingForms.forEach((item, index) => {
      return formData.append(`TeachingFormIds[${index}]`, `${item.key}`);
    });

    profile.areas.forEach((item, index) => {
      return formData.append(`AreaIds[${index}]`, `${item.key}`);
    });

    formData.append('GenderId', `${profile.gender[0].key}`);

    formData.append('Avatar', profile.avatar);

    if (Array.isArray(certificates)) {
      certificates.forEach((item, index) => {
        return formData.append(`DegreeFiles`, item);
      });
    } else {
      formData.append(`DegreeFiles`, certificates);
    }

    if (Array.isArray(studentIdCard)) {
      studentIdCard.forEach((item, index) => {
        return formData.append(`StudentCardFiles`, item);
      });
    } else {
      formData.append(`StudentCardFiles`, studentIdCard);
    }

    formData.append('IdentityBeforeFile', idCardFrontside);

    formData.append('IdentityAfterFile', idCardBackside);
    // handle call api
    return dispatch(doCreateTutor(formData));
  };
  
  // arrParent [file,file,string,string,string]=> arrchild1 [file,file], arrchild2 [string,string]
  const splitArray = (arrParent: any[]) => {
    let arrFile: File[] = [];
    let arrString: string[] = [];

    Array.isArray(arrParent) &&
      arrParent.length > 0 &&
      arrParent.map((item, index) => {
        if (isFileImage(item as File)) {
          arrFile.push(item);
        } else {
          arrString.push(item);
        }
      });

    return {
      arrFile,
      arrString,
    };
  };

  const getArrDiffrent = (arrObj: { key: number; value: string }[], arrString: string[]) => {
    let listDiffrentIds: number[] = [];
    if (arrString.length > 0 && arrObj.length > 0) {
      let arrDiffrence = arrObj.filter(object => {
        return !arrString.some(stringImage => {
          return object.value === stringImage;
        });
      });
      arrDiffrence.map((item, index) => {
        listDiffrentIds.push(item.key);
      });
      return listDiffrentIds;
    } else if (arrObj.length > 0 && arrString.length <= 0) {
      arrObj.map((item, index) => {
        listDiffrentIds.push(item.key);
      });
      return listDiffrentIds;
    } else {
      return listDiffrentIds;
    }
  };

  const handleUpdateTutorProfile = async () => {
    const formData = new FormData();

    const { arrFile: arrFileCertificates, arrString: arrStringCertificates } = splitArray(certificates);
    const { arrFile: arrFileStudentIdCard, arrString: arrStringStudentIdCard } = splitArray(studentIdCard);
    const arrCertificatesDeteted = getArrDiffrent(certificatesDefault, arrStringCertificates);
    const arrStudentcardDeteted = getArrDiffrent(studentcardfilesDefault, arrStringStudentIdCard);

    formData.append('Id', `${profile.tutorid}`);
    formData.append('FullName', profile.fullname);
    formData.append('BirthDate', moment(profile.birthdate).format('YYYY-MM-DD'));
    formData.append('Phone', profile.phone);
    if (profile.academiclevel.length) {
      formData.append('AcademicLevelId', `${profile.academiclevel[0].key}`);
    }
    formData.append('Experience', profile.experience);
    if (profile.certificated) formData.append('IsCertificated', `${profile.certificated}`);

    profile.subjects.forEach((item, index) => {
      return formData.append(`SubjectIds[${index}]`, `${item.key}`);
    });

    profile.classes.forEach((item, index) => {
      return formData.append(`ClassIds[${index}]`, `${item.key}`);
    });

    profile.teachingForms.forEach((item, index) => {
      return formData.append(`TeachingFormIds[${index}]`, `${item.key}`);
    });

    profile.areas.forEach((item, index) => {
      return formData.append(`AreaIds[${index}]`, `${item.key}`);
    });

    formData.append('GenderId', `${profile.gender[0].key}`);

    formData.append('Avatar', isFileImage(profile.avatar as File) ? profile.avatar : '');

    if (Array.isArray(arrFileCertificates)) {
      arrFileCertificates.forEach((item, index) => {
        return formData.append(`DegreeFiles`, item);
      });
    }

    if (Array.isArray(arrCertificatesDeteted) && arrCertificatesDeteted.length > 0) {
      arrCertificatesDeteted.forEach((item, index) => {
        return formData.append(`DegreeRemoveIds[${index}]`, `${item}`);
      });
    } else {
      formData.append(`DegreeRemoveIds[0]`, `0`);
    }

    if (Array.isArray(arrFileStudentIdCard) && arrFileStudentIdCard.length > 0) {
      arrFileStudentIdCard.forEach((item, index) => {
        return formData.append(`StudentCardFiles`, item);
      });
    }

    if (Array.isArray(arrStudentcardDeteted) && arrStudentcardDeteted.length > 0) {
      arrStudentcardDeteted.forEach((item, index) => {
        return formData.append(`StudentCardRemoveIds[${index}]`, `${item}`);
      });
    } else {
      formData.append(`StudentCardRemoveIds[0]`, `0`);
    }

    if (Array.isArray(arrIdentitiesDeteted) && arrIdentitiesDeteted.length > 0) {
      arrIdentitiesDeteted.forEach((item, index) => {
        return formData.append(`RemoveFileIds[${index}]`, `${item}`);
      });
    } else {
      formData.append(`RemoveFileIds[0]`, `0`);
    }

    formData.append('IdentityBeforeFile', isFileImage(idCardFrontside as File) ? idCardFrontside : '');

    formData.append('IdentityAfterFile', isFileImage(idCardBackside as File) ? idCardBackside : '');

    // handle call api
    return await dispatch(doUpdateTutor(formData));
  };

  const handleChangeIdentitiesCard = () => {
    let arrIds: number[] = [];
    if (isFileImage(idCardFrontside as File) && isFileImage(idCardBackside as File)) {
      identitiesDefault.map((item, index) => {
        const key = item?.key;
        return arrIds.push(key);
      });
    } else if (isFileImage(idCardFrontside as File)) {
      let idFront = idCardFrontside && identitiesDefault[0]?.key;
      arrIds.push(idFront);
    } else if (isFileImage(idCardBackside as File)) {
      let idBack = identitiesDefault && identitiesDefault[1]?.key;
      arrIds.push(idBack);
    } else {
      arrIds = [];
    }
    setArrIdentitiesDeteted(arrIds);
  };
  return (
    <>
      <div className="profile-step-3">
        <div className="profile-step-3__input">
          <p className="profile-step-3__input__label">Bằng cấp</p>
          <ImageFrame image={certificates} setImage={setCertificates} isMultiple ratio={364 / 210} />
        </div>
        <div className="profile-step-3__input">
          <p className="profile-step-3__input__label">Thẻ sinh viên</p>
          <ImageFrame image={studentIdCard} setImage={setStudentIdCard} isMultiple ratio={364 / 210} />
        </div>
        <div className="profile-step-3__input">
          <p className="profile-step-3__input__label">Chứng minh nhân dân/ CCCD</p>
          <ImageFrame
            image={idCardFrontside}
            setImage={setIdCardFrontside}
            ratio={364 / 210}
            placeholder="Tải ảnh mặt trước"
          />
          <ImageFrame
            image={idCardBackside}
            setImage={setIdCardBackside}
            ratio={364 / 210}
            placeholder="Tải ảnh mặt sau"
          />
        </div>
      </div>
    </>
  );
});
