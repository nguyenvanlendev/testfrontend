import { useState } from 'react';

import closeIcon from '../../../assets/img/draft/back-icon.png';
import { Button } from '../../../components/common/Button/Button';
import { Input } from '../../../components/common/Input/Input';
import ModalSuccess from '../components/ModalSuccess';
import './ForgotPassword.scss';
import { apiLogin } from '../../../services/axios/apiLogin';
import { apiOTP } from '../../../services/axios/apiSendOTP';
import { useNavigate } from 'react-router-dom';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
const ForgotPassword = () => {
  const history = useNavigate();

  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newpassword, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);

  //Error

  const [phoneError, setPhoneError] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [newpasswordError, setNewPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  //Valid

  const [phoneValid, setPhoneValid] = useState<boolean>(true);
  const [otpValid, setOtpValid] = useState<boolean>(false);
  const [newpasswordValid, setNewPasswordValid] = useState<boolean>(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean>(false);

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
      setOtpValid(false);
    } else {
      setOtpError('');
      setOtpValid(true);
    }
  };

  const validatePassword = () => {
    if (newpassword.length < 6) {
      setNewPasswordError('*Mật khẩu phải lớn hơn 6 kí tự!');
      setNewPasswordValid(false);
    } else if (newpassword.length > 25) {
      setNewPasswordError('*Mật khẩu phải nhỏ hơn 25 kí tự!');
      setNewPasswordValid(false);
    } else {
      setNewPasswordError('');
      setNewPasswordValid(true);
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword.length < 6) {
      setConfirmPasswordError('*Mật khẩu phải lớn hơn 6 kí tự!');
      setConfirmPasswordValid(false);
    }
    if (confirmPassword.length > 25) {
      setConfirmPasswordError('*Mật khẩu phải nhỏ hơn 25 kí tự!');
      setConfirmPasswordValid(false);
    }
    if (newpassword !== confirmPassword) {
      setConfirmPasswordError('*Mật khẩu nhập lại không giống mật khẩu mới!');
      setConfirmPasswordValid(false);
      return;
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordValid(true);
    }
  };

  const handleCheckCompleteInfor = () => {
    if (phoneValid && otpValid && newpasswordValid && confirmPasswordValid) {
      return true;
    }
    return false;
  };
  const handleCheckValidAll = () => {
    if (!handleCheckCompleteInfor()) {
      if (!phone) {
        setPhoneError('*Vui lòng nhập số điện thoại!');
        setPhoneValid(false);
      }
      if (!otp) {
        setOtpError('*Vui lòng nhập OTP!');
        setOtpValid(false);
      }
      if (!newpassword) {
        setNewPasswordError('*Vui lòng nhập mật khẩu!');
        setNewPasswordValid(false);
      }
      if (!confirmPassword) {
        setConfirmPasswordError('*Vui lòng xác nhận mật khẩu!');
        setConfirmPasswordValid(false);
      }
      return false;
    }
    return true;
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

  const handleSendOTP = () => {
    if(phone) {
      apiLogin.checkPhoneUserExt({ phone: phone}).then((res) => {
        if(res.data.Result) {
          setPhoneValid(true);
          setPhoneError("");
          apiOTP
            .sendOTP({
              phone: phone,
              type: 'PHONE',
              action: 'VERIFIERFORGOTTUTOR',
            })
            .then((res:any) => {
                if(res.result) {
                 
                }
            })
            .catch((error:any) => {
              console.log("error", error)
            })
        }
        else {
          setPhoneValid(false)
          setPhoneError("*Số điện thoại không có tài khoản nào")
        }
      }
      )
    }
    else {
      setPhoneValid(false)
      setPhoneError("* Vui lòng nhập số điện thoại")
    }
    
  };

  const handleSubmit = () => {
    if (handleCheckValidAll()) {
      apiOTP
        .checkOTPForgotPassword({
          Phone: phone,
          Otp: otp,
        })
        .then(res => {
          if (res.data.Result) {
            apiLogin
              .forgotPassword({
                Phone: phone,
                Password: newpassword,
                Otp: otp,
              })
              .then(res => {
                setIsShow(true);
              });
          } else {
            setOtpValid(false);
            setOtpError('*OTP không chinh xác');
          }
        });
    } else {
      return;
    }
  };

  return (
    <>
      <div className="forgot-wrapper">
        <div className="forgot__header">
          <img src={closeIcon} alt="Tạo mật khẩu mới" onClick={() => {
            history(-1);
          }}/>
          <p>Tạo mật khẩu mới</p>
        </div>

        <div className="forgot__main">
          <p className="forgot__main--title">
            Vui lòng xác nhận số điện thoại đăng ký và OTP để tạo mật khẩu mới cho tài khoản:
          </p>
          <div className="input-wrapper input-wrapper--otp">
            <p className="forgot__main--label">Số điện thoại</p>
            <div className="forgot__main--otp">
              <div style={{ width: 'calc(100% - 116px)' }}>
                <Input
                  onChange={(item: any) => {
                    const value = item.target.value.replace(/ /g, '');
                    if (value.length < 11) setPhone(value);
                  }}
                  placeholder="Nhập số điện thoại"
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
                  }}
                  onBlur={e => handleBlurPhone()}
                />
              </div>

              <Button type="button" className="forgot__button--otp" onClick={() => handleSendOTP()}>
                Gửi OTP
              </Button>
            </div>
          </div>
          <div className="input-wrapper">
            <p className="forgot__main--label">OTP</p>
            <Input
              onChange={(item: any) => {
                setOtp(item.target.value);
              }}
              placeholder="Nhập mã OTP từ số điện thoại của bạn"
              value={otp}
              type="text"
              maxLength={6}
              error={otpError}
              setName={setOtp}
              colorText={'#3F3F3F'}
              colorLabel={'#3F3F3F'}
              onFocus={() => {
                setOtpError('');
              }}
              onBlur={e => handleBlurOTP()}
            />
          </div>
          <div className="input-wrapper">
            <p className="forgot__main--label">Mật khẩu mới</p>
            <Input
              onChange={(item: any) => {
                setPassword(item.target.value);
              }}
              placeholder="Nhập mật khẩu cho tài khoản"
              value={newpassword}
              type="password"
              setName={setPassword}
              colorText={'#3F3F3F'}
              colorLabel={'#3F3F3F'}
              isShowEge={true}
              error={newpasswordError}
              onFocus={() => {
                setNewPasswordError('');
              }}
              onBlur={e => handleBlurPassword()}
            />
          </div>
          <div className="input-wrapper">
            <p className="forgot__main--label">Nhập lại mật khẩu</p>
            <Input
              onChange={(item: any) => {
                setConfirmPassword(item.target.value);
              }}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              type="password"
              setName={setConfirmPassword}
              colorText={'#3F3F3F'}
              colorLabel={'#3F3F3F'}
              isShowEge={true}
              error={confirmPasswordError}
              onFocus={() => {
                setConfirmPasswordError('');
              }}
              onBlur={e => handleBlurConfirmPassword()}
            />
          </div>
        </div>

        <div className="forgot__footer">
          <Button width={186} type="button" className="forgot__button" onClick={() => handleSubmit()}>
            Xác nhận
          </Button>
        </div>
      </div>
      <ModalSuccess
        isShow={isShow}
        setIsShow={setIsShow}
        clickOutside={() => {
          history('/login');
        }}
      />
    </>
  );
};

export default ForgotPassword;
