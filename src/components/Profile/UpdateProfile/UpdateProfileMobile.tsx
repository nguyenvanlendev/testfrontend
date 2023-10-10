import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SvgCammera from '../../../assets/svg/SvgCammera';
import { Avatar } from '../../common/Avatar/Avatar';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import ModalConfirm from '../../common/ModalConfirm/ModalConfirm';
import PageHeader from '../../common/PageHeader/PageHeader';
import closeIcon from '../../../assets/img/draft/back-icon.png';
import './UpdateProfileMobile.scss';
import { DropdownTick } from '../../common/DropdownTick/DropdownTick';
import { dataGender, genderChosen } from '../../../constants';

const UpdateProfileMobile = () => {
  const location = useLocation();

  const [localImage, setLocalImage] = useState<string>('');
  const [name, setName] = useState<string>('Nguyễn Hoàng Linh');
  const [phone, setPhone] = useState<string>('0937373777');
  const [otp, setOtp] = useState<string>('');
  const [gender, setGender] = useState<number>();
  const [newpassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isShowModalConfirmReturn, setIsShowModalConfirmReturn] = useState(false);
  const [isShowModalConfirmSave, setIsShowModalConfirmSave] = useState(false);

  const avatar = (location.state as { avatar: string | null })?.avatar;
  const [listGenderOption, setListGenderOption] = useState<ListOption>([]);
  
  const [isDisableOTP, setIsDisableOTP] = useState<boolean>(true)

  //Error
  const [nameError, setNameError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [newpasswordError, setNewPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  //isValid
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [genderValid, setGenderValid] = useState<boolean>(true);
  const [phoneValid, setPhoneValid] = useState<boolean>(true);
  const [otpValid, setOtpValid] = useState<boolean>(false);
  const [newpasswordValid, setNewPasswordValid] = useState<boolean>(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    if (avatar) {
      setLocalImage(avatar);
    }
  }, [avatar]);

  //Validation
  const validateName = () => {
    if (!/([a-zA-Z ])\w*/.test(name) && name) {
      setNameValid(false);
      setNameError('*Tên không được có chữ số!');
    } else {
      setNameError('');
      setNameValid(true);
    }
  };

  const validatePhone = () => {
    // if (currentUser) return true;
    if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone) && phone) {
      setPhoneError('*Số điện thoại không chính xác!');
      setPhoneValid(false);
    } else {
      setPhoneError('');
      setPhoneValid(true);
    }
  };

  const validateOTP = () => {
    if (otp.length < 6) {
      setOtpError('*OTP phải bao gồm 6 chữ số!');
      setOtpValid(false)
    }
    else {
      setOtpError('');
      setOtpValid(true)
    }
  }

  const validatePassword = () => {
    if (newpassword.length < 6) {
      setNewPasswordError('*Mật khẩu phải lớn hơn 6 kí tự!');
      setNewPasswordValid(false)
    }
    else if (newpassword.length > 25) {
      setNewPasswordError('*Mật khẩu phải nhỏ hơn 25 kí tự!');
      setNewPasswordValid(false)
    }
    else {
      setNewPasswordError('')
      setNewPasswordValid(true)
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword.length < 6) {
      setConfirmPasswordError('*Mật khẩu phải lớn hơn 6 kí tự!');
      setConfirmPasswordValid(false)
    }
    if (confirmPassword.length > 25) {
      setConfirmPasswordError('*Mật khẩu phải nhỏ hơn 25 kí tự!');
      setConfirmPasswordValid(false)
      
    }
    if (newpassword !== confirmPassword) {
      setConfirmPasswordError('*Mật khẩu nhập lại không giống mật khẩu mới!');
      setConfirmPasswordValid(false)
      return;
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordValid(true)
    }
  };

  //Handle when click outside input
  const handleBlurName = () => {
    if (name == '') return;
    validateName();
  };

  const handleBlurPhone = () => {
    if (phone === '') return;
    validatePhone();
  };

  const handleBlurOTP = () => {
    if (otp === '') return;
    validateOTP();
  };

  const handleBlurPassword = () => {
    if (newpassword === '') return;
    validatePassword();
  };

  const handleBlurConfirmPassword = () => {
    if (confirmPassword === '') return;
    validateConfirmPassword();
  };

  const handleCheckCompleteInfor = () => {
    if (
      nameValid &&
      phoneValid &&
      // otpValid &&
      newpasswordValid &&
      confirmPasswordValid &&
      name &&
      phone &&
      // otp &&
      newpassword &&
      confirmPassword
    ) {
      return true
    }
    return false
  }

  const handleCheckValidAll = () => {
    if(!handleCheckCompleteInfor()) {
      if (!name) {
        setNameError('*Vui lòng nhập Họ và tên!');
        setNameValid(false)
      }
      if (!phone) {
        setPhoneError('*Vui lòng nhập số điện thoại!');
        setPhoneValid(false)
      }
      if (!isDisableOTP && !otp) {
        setOtpError('*Vui lòng nhập OTP!');
        setOtpValid(false)
      }
      if (!newpassword) {
        setNewPasswordError('*Vui lòng nhập mật khẩu!');
        setNewPasswordValid(false)
      }
      if (!confirmPassword) {
        setConfirmPasswordError('*Vui lòng xác nhận mật khẩu!');
        setConfirmPasswordValid(false)
      }
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    if (handleCheckValidAll()) {
      // handle submit
      
      setIsValid(false);
      setIsShowModalConfirmSave(true);
    } else {
      setIsValid(false);
    }
  };

  //handle when click back icon
  const handleReturn = () => {
    setIsShowModalConfirmReturn(true);
  };

  const handleSendOTP = () => {
    // handle send otp
  };
  return (
    <div className="update-profile-mobile">
      {/* <PageHeader title="Cập nhật thông tin" /> */}
      <div className="page-header">
        <img src={closeIcon} alt="" className="back-icon" onClick={() => handleReturn()} />
        <h3 className="page-header-title">Cập nhật thông tin</h3>
      </div>
      <div className="update-profile-mobile__content">
        <div className="update-profile-mobile__main">
          <div className="update-profile-mobile__avatar">
              <Avatar
                image={localImage ? localImage : null}
                width={'150px'}
                height={'150px'}
                borderRadius={45}
                filter={'drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25))'}
                className="update-profile-mobile__avatar--image"
              />
              <Link to={'/profile-general/update'}>
                <div className="update-profile-mobile__avatar--icon">
                  <SvgCammera />
                </div>
              </Link>
          </div>
          <div className="input-wrapper">
            <p className="update-profile-mobile__main--label">Họ và tên</p>
            <Input
              onChange={(item: any) => {
                setName(item.target.value);
              }}
              placeholder="Nhập họ tên của bạn"
              value={name}
              type="text"
              maxLength={30}
              setName={setOtp}
              error={nameError}
              colorText={'#3F3F3F'}
              colorLabel={'#3F3F3F'}
              onFocus={() => {
                setNameError('');
              }}
              onBlur={e => handleBlurName()}
            />
          </div>
          <div className="input-wrapper">
            <p className="update-profile-mobile__main--label">Giới tính</p>
            <DropdownTick
              listOption={dataGender}
              isMultipleOption={false}
              setListChosenOption={(listGenderOption: ListOption) => {
                setListGenderOption(listGenderOption);
              }}
              placeholder="Giới tính"
              listChosenOption={genderChosen}
            />
          </div>
          <div className="input-wrapper input-wrapper--otp">
            <p className="update-profile-mobile__main--label">Số điện thoại</p>
            <div className="update-profile-mobile__main--otp">
              <div style={{ width: 'calc(100% - 114px)' }}>
                <Input
                  onChange={(item: any) => {
                    const value = item.target.value.replace(/ /g, '');
                    if (value.length < 11) setPhone(value);
                  }}
                  placeholder="Nhập số điện thoại của bạn"
                  value={phone}
                  isClear={true}
                  setName={setPhone}
                  colorText={'#3F3F3F'}
                  colorLabel={'#3F3F3F'}
                  type="text"
                  validation="phone"
                  isNumber={true}
                  error={phoneError}
                  onFocus={() => {
                    setPhoneError('');
                    setIsDisableOTP(false)
                  }}
                  onBlur={e => handleBlurPhone()}
                />
              </div>

              <Button
                type="button"
                className="update-profile-mobile__button--otp"
                onClick={() => handleSendOTP()}
                isBlur={isDisableOTP}
              >
                Gửi OTP
              </Button>
            </div>
          </div>
          <div className="input-wrapper">
            <p className="update-profile-mobile__main--label">OTP</p>
            <Input
              onChange={(item: any) => {
                const value = item.target.value.replace(/ /g, '');
                if (value.length < 7) setOtp(value);
              }}
              placeholder="Nhập mã OTP từ số điện thoại của bạn"
              value={otp}
              isClear={true}
              setName={setOtp}
              colorText={'#3F3F3F'}
              colorLabel={'#3F3F3F'}
              isDisable={isDisableOTP}
              background={'#FFF'}
              backgroundDisable ={"#DADADA"}
              type="number"
              maxLength={6}
              isNumber={true}
              error={otpError}
              onFocus={() => {
                setOtpError('');
                setIsDisableOTP(false)
              }}
              onBlur={e => handleBlurOTP()}
            />
          </div>
          <div className="input-wrapper">
            <p className="update-profile-mobile__main--label">Mật khẩu mới</p>
            <Input
              onChange={(item: any) => {
                setNewPassword(item.target.value);
              }}
              placeholder="Nhập mật khẩu cho tài khoản"
              value={newpassword}
              type="password"
              setName={setNewPassword}
              error={newpasswordError}
              colorText={'#3F3F3F'}
              colorLabel={'#3F3F3F'}
              onFocus={() => {
                setNewPasswordError('');
              }}
              onBlur={e => handleBlurPassword()}
            />
          </div>
          <div className="input-wrapper">
            <p className="update-profile-mobile__main--label">Nhập lại mật khẩu</p>
            <Input
              onChange={(item: any) => {
                setConfirmPassword(item.target.value);
              }}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              type="password"
              setName={setConfirmPassword}
              error={confirmPasswordError}
              colorText={'#3F3F3F'}
              colorLabel={'#3F3F3F'}
              onFocus={() => {
                setConfirmPasswordError('');
              }}
              onBlur={e => handleBlurConfirmPassword()}
            />
          </div>
          <div className="update-profile-mobile__note update-profile-mobile__note--error">
            {/* <p>*Bạn vui lòng nhập đầy đủ thông tin</p> */}
          </div>
        </div>
      </div>
      <div className="update-profile-mobile__footer">
        <Button type="button" className="update-profile-mobile__button" onClick={() => handleSubmit()}>
          Cập nhật
        </Button>
      </div>

      <ModalConfirm
        isShow={isShowModalConfirmReturn}
        text={'Bạn chưa hoàn tất cập nhật, những cập nhật của bạn sẽ không được lưu lại. Bạn có chắc chắn muốn thoát?'}
        onClose={() => setIsShowModalConfirmReturn(false)}
        navigateTo={'/profile'}
      />

      <ModalConfirm
        isShow={isShowModalConfirmSave}
        text={'Bạn có chắc chắn muốn cập nhật thông tin?'}
        onClose={() => setIsShowModalConfirmSave(false)}
        isReturnConfirm={false}
      />
    </div>
  );
};

export default UpdateProfileMobile;
