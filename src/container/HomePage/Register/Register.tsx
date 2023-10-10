import './Register.scss';
import { useEffect, useState } from 'react';
import closeIcon from '../../../assets/img/draft/back-icon.png';
import { Button } from '../../../components/common/Button/Button';
import { Input } from '../../../components/common/Input/Input';
import { Avatar } from '../../../components/common/Avatar/Avatar';
import SvgCammera from '../../../assets/svg/SvgCammera';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DropdownTick } from '../../../components/common/DropdownTick/DropdownTick';
import { apiOTP } from '../../../services/axios/apiSendOTP';
import { dataGender } from '../../../constants';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //State
  const [username, setUsername] = useState<string>('');
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<number | string>('');
  const [gender, setGender] = useState<string>('');
  const [password, setPassword] = useState<number | string>('');
  const [localImage, setLocalImage] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<number | string>('');
  const [sentOTP,setSentOTP] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  
  const avatar = (location.state as { avatar: string | null })?.avatar;

  //Error
  const [nameError, setNameError] = useState<string>(''); 
  const [phoneError, setPhoneError] = useState<string>('');
  const [otpError, setOTPError] = useState<string>('');
  //const 



  const handleSubmit = () => {
    if (phone && password && otp && confirmPassword) {
      // handle submit
      setIsValid(false);
    } else {
      setIsValid(false);
    }
  };

  const handleSendOTP = () => {
    apiOTP
      .sendOTP({
        phone: phone,
        type: 'PHONE',
        action: 'VERIFIERTUTOR',
      })
      .then((res:any) => {
          if(res.result) {
            setSentOTP(true);
          }
      })
      .catch((error:any) => {
        setSentOTP(false);
      })
  };


  useEffect(() => {
    if (avatar) {
      setLocalImage(avatar);
    }
  }, [avatar]);

  

  const [listChosenOption, setListChosenOption] = useState<ListOption>([]);

  return (
    <div className="register-wrapper">
      <div className="register__header" onClick={() => navigate(-1)}>
        <img src={closeIcon} alt="Tạo mật khẩu mới" />
        <p>Đăng ký tài khoản</p>
      </div>
      <div className="register__main">
        <div className="register__avatar">
          <Link to={'/register/avatar'}>
            <Avatar
              image={localImage ? localImage : null}
              width={'150px'}
              height={'150px'}
              borderRadius={45}
              className="register__avatar--image"
            />
            <div className="register__avatar--icon">
              <SvgCammera />
            </div>
          </Link>
        </div>
        <div className="input-wrapper">
          <p className="register__main--label">Họ và tên</p>
          <Input
            onChange={(item: any) => {
              setUsername(item.target.value);
            }}
            placeholder="Nhập họ tên của bạn"
            value={username}
            type="text"
            maxLength={30}
            setName={setUsername}
            colorText={'#3F3F3F'}
            colorLabel={'#3F3F3F'}
          />
        </div>
        <div className="input-wrapper input-wrapper--otp">
          <p className="register__main--label">Số điện thoại</p>
          <div className="register__main--otp">
            <div style={{ width: 'calc(100% - 114px)', marginRight: '8px' }}>
              <Input
                onChange={(item: any) => {
                  const value = item.target.value.replace(/ /g, '');
                  if (value.length < 11) setPhone(value);
                }}
                placeholder="Nhập số điện thoại của bạn"
                value={phone}
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
              />
            </div>

            <Button type="button" className="register__button--otp" onClick={() => handleSendOTP()}>
              Gửi OTP
            </Button>
          </div>
        </div>
        <div className="input-wrapper">
          <p className="register__main--label">OTP</p>
          <Input
            onChange={(item: any) => {
              setOtp(item.target.value);
            }}
            placeholder="Nhập mã OTP từ số điện thoại của bạn"
            value={otp}
            type="text"
            setName={setOtp}
            maxLength={6}
            colorText={'#3F3F3F'}
            colorLabel={'#3F3F3F'}
          />
        </div>
        <div className="drop-wrapper">
          <p className="register__main--label">Giới tính</p>
          <DropdownTick
            listChosenOption={listChosenOption}
            listOption={dataGender}
            isMultipleOption={false}
            setListChosenOption={(listChosenOption: ListOption) => {
              setListChosenOption(listChosenOption);
            }}
            placeholder="Chọn giới tính của bạn"
          />
        </div>
        <div className="input-wrapper">
          <p className="register__main--label">Mật khẩu mới</p>
          <Input
            onChange={(item: any) => {
              setPassword(item.target.value);
            }}
            placeholder="Nhập mật khẩu cho tài khoản"
            value={password}
            type="password"
            setName={setPassword}
            colorText={'#3F3F3F'}
            colorLabel={'#3F3F3F'}
            isShowEge={false}
          />
        </div>
        <div className="input-wrapper">
          <p className="register__main--label">Nhập lại mật khẩu</p>
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
            isShowEge={false}
          />
        </div>

        {!isValid && (
          <div className="register__note register__note--error">
            <p>*Bạn vui lòng nhập đầy đủ thông tin</p>
          </div>
        )}
      </div>

      <div className="register__footer">
        <Button type="button" className="register__button" onClick={() => handleSubmit()}>
          Đăng ký
        </Button>
      </div>
    </div>
  );
};

export default Register;
