import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import closeIcon from '../../../assets/img/draft/back-icon.png';
import { Button } from '../../../components/common/Button/Button';
import { Input } from '../../../components/common/Input/Input';
import { apiLogin } from '../../../services/axios/apiLogin';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../utils/auth';
import './Login.scss';

const Login = () => {
  const location = useLocation();
  const history = useNavigate();
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //Error
  const [phoneError, setPhoneError] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    if (phone && password) {
      setError("");
      apiLogin.login({
        Phone: phone,
        Password: password
      }).then((res) => {
        if(res.data.Result) {
          login(res.data.Content)
          history('/')
        }
        else {
          setError("*Số điện thoại hoặc mật khẩu không chính xác")
        }
      })
      .catch((error) => {
        setError("*Đã có lỗi xảy ra vui lòng thử lại")
        console.log("error", error)
      })
    }
    else {
      setError("*Bạn vui lòng nhập đầy đủ thông tin")
    }
  };

  //const searchParams = new URLSearchParams(location.search);
  // const fromUrl = searchParams.get('fromUrl');
  // const classId = searchParams.get('classId');


  
  return (
    <div className="login-wrapper">
      <div className="login__header">
        <img src={closeIcon} alt="Đăng nhập" onClick={() => {
          history('/')
        }}/>
        <p>Đăng nhập</p>
      </div>

      <div className="login__main">
        <div className="input-wrapper">
          <p className="login__main--label">Số điện thoại</p>
          <Input
            onChange={(item: any) => {
              const value = item.target.value.replace(/ /g, '');
              if (value.length < 11) setPhone(value);
            }}
            placeholder="Nhập số điện thoại của bạn"
            value={phone}
            isClear={true}
            setName={setPhone}
            isNumber={true}
            validation="phone"
            colorText={'#3F3F3F'}
            colorLabel={'#3F3F3F'}
            type="text"
            error={phoneError}
            onFocus={() => {
              setPhoneError('');
            }}
          />
        </div>
        <div className="input-wrapper">
          <p className="login__main--label">Mật khẩu</p>
          <Input
            onChange={(item: any) => {
              setPassword(item.target.value);
            }}
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            type="password"
            setName={setPassword}
            colorText={'#3F3F3F'}
            colorLabel={'#3F3F3F'}
            isShowEge={false}
          />
        </div>
        <div className="login__note login__note--error">
          <p>{error}</p>
        </div>
        <div className="login__main--forgotpass">
          <Link to={'/forgot'}>Quên mật khẩu?</Link>
        </div>
      </div>

      <div className="login__footer">
        <Button type="button" className="login__button" onClick={() => handleSubmit()}>
          Đăng nhập
        </Button>
      </div>


    </div>
  );
};

export default Login;
