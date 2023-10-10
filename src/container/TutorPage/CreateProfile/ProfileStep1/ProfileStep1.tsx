import React, { useEffect, useImperativeHandle, useState } from 'react';
import { DropdownTick } from '../../../../components/common/DropdownTick/DropdownTick';
import { RadioGroup } from '../../../../components/common/RadioGroup/RadioGroup';
import { ImgPortfolio, dataCertificate, dataGender } from '../../../../constants';
import './ProfileStep1.scss';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { Input } from '../../../../components/common/Input/Input';
import { doUpdateProfile, doUpdateValidation } from '../../../../redux/slice/apiSlice/tutorProfiles';
import { IDataFill } from '../../../../@types/apiResponse';
import TextArea from '../../../../components/common/TextArea/TextArea';

interface IProfileStep1 {
  profile?: ITutorProfileDetail;
  ref: any;
}
interface IerrorStateStep1 {
  certificateError?: string;
  academicLevelError?: string;
  subjectError?: string;
  expDesError?: string;
  classError?: string;
  formError?: string;
  areaError?: string;
  genderError?: string;
}

export const ProfileStep1: React.FC<IProfileStep1> = React.forwardRef(({ profile }, ref) => {
  const [certificate] = useState(dataCertificate);

  const [gender] = useState(dataGender);

  const { academicLevels, subjects, classes, forms, areas } = useAppSelector(state => state.dataForm);
  const dispatch = useAppDispatch();
  const [cCertificate, setCCertificate] = useState<number>(0);
  const [cAcademicLevel, setCAcademicLevel] = useState<IDataFill[]>([]);
  const [cSubject, setCSubject] = useState<IDataFill[]>([]);
  const [cExpDes, setCExpDes] = useState('');
  const [cClass, setCClass] = useState<IDataFill[]>([]);
  const [cForm, setCForm] = useState<IDataFill[]>([]);
  const [cArea, setCArea] = useState<IDataFill[]>([]);
  const [cGender, setCGender] = useState<IDataFill[]>([]);
  /**
   * cAcademicLevel: Trình độ
   * cExpDes: Kinh nghiệm
   * cCertificate chứng nhận gia sư
   * cSubject: Đăng ký môn
   * cClass: Đăng ký lớp
   * cForm: Hình thức giảng dạy
   * cArea: Khu vực
   * cGender: giới tính
   */
  //Error
  const initProfileError = {
    certificateError: '',
    academicLevelError: '',
    subjectError: '',
    expDesError: '',
    classError: '',
    formError: '',
    areaError: '',
    genderError: '',
  };
  const [profileError, setProfileError] = useState<IerrorStateStep1>(initProfileError);

  useEffect(() => {
    if (profile) {
      setCCertificate(profile.certificated || 0);
      setCAcademicLevel(profile.academiclevel);
      setCSubject(profile.subjects || []);
      setCClass(profile.classes || []);
      setCForm(profile.teachingForms || []);
      setCArea(profile.areas || []);
      setCGender(profile.gender);
      setCExpDes(profile.experience);
    }
  }, [profile]);

  useImperativeHandle(ref, () => ({
    handlePassStep() {
      let arrStateData = [];
      const newProfileError: IerrorStateStep1 = {};
      arrStateData.push({ cAcademicLevel: cAcademicLevel });
      arrStateData.push({ cExpDes: cExpDes });
      arrStateData.push({ cCertificate: cCertificate });
      arrStateData.push({ cSubject: cSubject });
      arrStateData.push({ cClass: cClass });
      arrStateData.push({ cForm: cForm });
      arrStateData.push({ cArea: cArea });
      arrStateData.push({ cGender: cGender });

      let results = arrStateData.map((item, _) => {
        let typeOfItem = typeof Object.values(item);
        let value = Object.values(item)[0]; // value of object
        let key = Object.keys(item)[0]; // key of object
        if (typeOfItem === 'object' && Array.isArray(value)) {
          if (value.length <= 0) {
            return key;
          }
        } else {
          if ((typeof value === 'number' && value < 0) || (typeof value !== 'number' && !value)) {
            return key;
          }
        }
      });

      // remove undefined item in array
      const filteredArray = results.reduce((accum: string[], element) => {
        if (element !== undefined) {
          accum.push(element);
        }
        return accum;
      }, []);

      if (filteredArray.length > 0) {
        filteredArray.map((itemError, _) => {
          if (itemError === 'cAcademicLevel') {
            newProfileError.academicLevelError = 'Bạn chưa chọn trình độ!';
          } else if (itemError === 'cExpDes') {
            newProfileError.expDesError = 'Bạn chưa nhập kinh nghiệm!';
          } else if (itemError === 'cCertificate') {
            newProfileError.certificateError = 'Bạn chưa chọn chứng nhận gia sư!';
          } else if (itemError === 'cSubject') {
            newProfileError.subjectError = 'Bạn chưa đăng ký môn!';
          } else if (itemError === 'cClass') {
            newProfileError.classError = 'Bạn chưa đăng ký lớp!';
          } else if (itemError === 'cForm') {
            newProfileError.formError = 'Bạn chưa chọn hình thức giảng dạy!';
          } else if (itemError === 'cArea') {
            newProfileError.areaError = 'Bạn chưa chọn khu vực!';
          } else if (itemError === 'cGender') {
            newProfileError.genderError = 'Bạn chưa chọn giới tính!';
          }
        });
        handleValidateProfile(newProfileError);
        return false;
      }

      //save current state into redux
      dispatch(
        doUpdateProfile({
          academiclevel: cAcademicLevel,
          subjects: cSubject,
          experience: cExpDes,
          classes: cClass,
          teachingForms: cForm,
          areas: cArea,
          gender: cGender,
          certificated: cCertificate,
        }),
      );
      return true;
    },
  }));

  const handleValidateProfile = (params: IerrorStateStep1) => {
    setProfileError({ ...profileError, ...params });
  };

  return (
    <div className="profile-step-1">
      <img className="profile-step-1__illustration" src={ImgPortfolio} />
      <div className="profile-step-1__input">
        <p className="profile-step-1__input__label">Trình độ</p>
        <DropdownTick
          placeholder="Chọn trình độ"
          listOption={academicLevels}
          listChosenOption={cAcademicLevel}
          setListChosenOption={setCAcademicLevel}
          error={profileError.academicLevelError}
        />
      </div>
      <div className="profile-step-1__input">
        <p className="profile-step-1__input__label">Kinh nghiệm</p>
        <TextArea
          placeholder="Nhập kinh nghiệm"
          rows={3}
          onChange={(e: any) => setCExpDes(e.target.value)}
          value={cExpDes}
          maxLength={300}
          error={profileError.expDesError}
          onFocus={e => {
            e.preventDefault();
            setProfileError({ ...profileError, expDesError: '' });
          }}
        />
      </div>
      <div className="profile-step-1__input">
        <p className="profile-step-1__input__label">Chứng nhận gia sư</p>
        <RadioGroup
          className="profile-step-1__input__radio"
          options={certificate}
          name="certificate"
          value={cCertificate}
          setSelected={setCCertificate}
        />
      </div>
      <div className="profile-step-1__input">
        <p className="profile-step-1__input__label">Đăng ký môn</p>
        <DropdownTick
          placeholder="Chọn bộ môn"
          isMultipleOption
          listChosenOption={cSubject}
          listOption={subjects}
          setListChosenOption={setCSubject}
          error={profileError.subjectError}
        />
      </div>
      <div className="profile-step-1__input">
        <p className="profile-step-1__input__label">Đăng ký lớp</p>
        <DropdownTick
          placeholder="Chọn lớp, cấp..."
          isMultipleOption
          listOption={classes}
          listChosenOption={cClass}
          setListChosenOption={setCClass}
          error={profileError.classError}
        />
      </div>
      <div className="profile-step-1__input">
        <p className="profile-step-1__input__label">Hình thức giảng dạy</p>
        <DropdownTick
          placeholder="Chọn hình thức"
          isMultipleOption
          listChosenOption={cForm}
          listOption={forms}
          setListChosenOption={setCForm}
          error={profileError.formError}
        />
      </div>
      <div className="profile-step-1__input">
        <p className="profile-step-1__input__label">Khu vực</p>
        <DropdownTick
          placeholder="Chọn khu vực"
          isMultipleOption
          listChosenOption={cArea}
          listOption={areas}
          setListChosenOption={setCArea}
          error={profileError.areaError}
        />
      </div>
      <div className="profile-step-1__input">
        <p className="profile-step-1__input__label">Giới tính</p>
        <DropdownTick
          placeholder="Chọn giới tính"
          listChosenOption={cGender}
          listOption={gender}
          setListChosenOption={setCGender}
          error={profileError.genderError}
        />
      </div>
    </div>
  );
});
