import React, { useEffect, useImperativeHandle, useState } from 'react';
import './ProfileStep2.scss';
import { ImageFrame } from '../../../../components/common/ImageFrame/ImageFrame';
import { Input } from '../../../../components/common/Input/Input';
import { Calendar } from '../../../../components/common/Calendar/Calendar';
import moment from 'moment';
import { useAppDispatch } from '../../../../redux';
import { doUpdateProfile, doUpdateValidation } from '../../../../redux/slice/apiSlice/tutorProfiles';
import { isFileImage } from '../../../../utils';

interface IProfileStep2 {
  profile?: ITutorProfileDetail;
  ref: any;
}
interface IerrorStateStep2 {
  nameError?: string;
  phoneError?: string;
  dobError?: string;
}

export const ProfileStep2: React.FC<IProfileStep2> = React.forwardRef(({ profile }, ref) => {
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState<File | string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [dob, setDob] = useState<any>(null);
  const [dateSelect, setDateSelect] = useState<any>(null);
  const [isShowCalendar, setIsShowCalendar] = useState(false);

  const initProfileError = {
    nameError: '',
    phoneError: '',
    dobError: '',
  };

  const [profileError, setProfileError] = useState<IerrorStateStep2>(initProfileError);

  useEffect(() => {
    if (profile) {
      if (profile.avatar) setAvatar(profile.avatar);
      if (profile.fullname) setName(profile.fullname);
      if (profile.phone) setPhone(profile.phone);
      if (profile.birthdate) {
        if (typeof profile.birthdate === 'string') {
          let birthdate = new Date(profile.birthdate);
          setDob(birthdate);
          setDateSelect(birthdate);
        } else {
          setDob(profile.birthdate);
          setDateSelect(profile.birthdate);
        }
      }
    }
  }, [profile]);

  const handleBlurPhone = () => {
    if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone as string) && phone) {
      setProfileError({ ...profileError, phoneError: 'Số điện thoại không hợp lệ' });
      return false;
    }
    if (phone) setProfileError({ ...profileError, phoneError: '' });
    return true;
  };

  const handleSelectCalendar = (time: Date) => {
    setDateSelect(time);
  };

  useImperativeHandle(ref, () => ({
    handlePassStep() {
      const isValidAvatar = isFileImage(avatar as File) || (typeof avatar === 'string' && avatar) ? true : false;

      if (!isValidAvatar) {
        dispatch(
          doUpdateValidation({
            isValid: false,
          }),
        );
        return false;
      }

      let arrStateData = [];
      const newProfileError: IerrorStateStep2 = {};
      arrStateData.push({ avatar: avatar });
      arrStateData.push({ name: name });
      arrStateData.push({ phone: phone });
      arrStateData.push({ dob: dob });

      let results = arrStateData.map((item, _) => {
        let typeOfItem = typeof Object.values(item);
        let value = Object.values(item)[0]; // value of object
        let key = Object.keys(item)[0]; // key of object

        if (typeOfItem === 'object') {
          if (typeof value === 'string' && !value) {
            return key;
          } else if (typeof value !== 'string' && !value) {
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
          if (itemError === 'phone') {
            newProfileError.phoneError = 'Bạn chưa nhập số điện thoại!';
          } else if (itemError === 'dob') {
            newProfileError.dobError = 'Bạn chưa nhập ngày sinh!';
          } else if (itemError === 'name') {
            newProfileError.nameError = 'Bạn chưa nhập họ và tên!';
          }
        });
        handleValidateProfile(newProfileError);
        return false;
      }

      dispatch(
        doUpdateProfile({
          avatar: avatar,
          fullname: name,
          birthdate: dob,
          phone: phone,
        }),
      );

      dispatch(
        doUpdateValidation({
          isValid: true,
        }),
      );

      return true;
    },
    handleBack() {
      dispatch(
        doUpdateProfile({
          avatar: avatar,
          fullname: name,
          birthdate: dob,
          phone: phone,
        }),
      );
    },
  }));

  const handleValidateProfile = (params: IerrorStateStep2) => {
    setProfileError({ ...profileError, ...params });
  };
  return (
    <div className="profile-step-2">
      <div className="profile-step-2__avatar">
        <p className="profile-step-2__label">Ảnh đại diện</p>
        <ImageFrame image={avatar} setImage={setAvatar} />
      </div>
      <div className="profile-step-2__input">
        <p className="profile-step-2__label">Họ và tên</p>
        <Input
          placeholder="Nhập họ và tên"
          type="text"
          value={name}
          maxLength={30}
          colorText="#3F3F3F"
          onChange={e => setName(e.target.value)}
          error={profileError.nameError}
          onBlur={() => setProfileError({ ...profileError, nameError: '' })}
        />
      </div>
      <div className="profile-step-2__input">
        <p className="profile-step-2__label">Ngày sinh</p>
        <Input
          placeholder="Nhập ngày tháng năm sinh"
          value={dob ? moment(dob).format('DD/MM/YYYY').toString() : ''}
          onFocus={() => {
            setProfileError({ ...profileError, dobError: '' });
            setIsShowCalendar(true);
          }}
          isDisable={isShowCalendar}
          colorText="#3F3F3F"
          error={profileError.dobError}
        />
      </div>
      <div className="profile-step-2__input">
        <p className="profile-step-2__label">Số điện thoại</p>
        <Input
          onChange={(item: any) => {
            const value = item.target.value.replace(/ /g, '');
            if (value.length < 11) setPhone(value);
          }}
          colorText="#3F3F3F"
          validation="phone"
          placeholder="Nhập số điện thoại"
          onFocus={() => {
            setProfileError({ ...profileError, phoneError: '' });
          }}
          value={phone}
          isNumber={true}
          setName={setPhone}
          error={profileError.phoneError}
          onBlur={handleBlurPhone}
        />
      </div>
      {isShowCalendar ? (
        <div className="calendar-wrapper">
          <Calendar
            isBeforeNow={true}
            onSelect={handleSelectCalendar}
            value={dateSelect}
            isShow={() => setIsShowCalendar(false)}
            getTime={(value: Date) => {
              if (value === null) {
                setProfileError({ ...profileError, dobError: 'Bạn không thể chọn ngày trong tương lai!' });
              } else if (value !== null && value) {
                setProfileError({ ...profileError, dobError: '' });
                setDateSelect(value);
                setDob(value);
              }
            }}
            // constraintDateBefore={undefined}
            // constraintDateAfter={new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate())}
            // constraintDateAfter={new Date(2007, 11, 31)}
          />
        </div>
      ) : null}
    </div>
  );
});
