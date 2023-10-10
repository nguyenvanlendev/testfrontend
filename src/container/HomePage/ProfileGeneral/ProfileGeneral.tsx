import './ProfileGeneral.scss';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SvgCammera from '../../../assets/svg/SvgCammera';
import { Avatar } from '../../../components/common/Avatar/Avatar';
import { Button } from '../../../components/common/Button/Button';
import { Input } from '../../../components/common/Input/Input';
import ModalConfirm from '../../../components/common/ModalConfirm/ModalConfirm';
import closeIcon from '../../../assets/img/draft/back-icon.png';
import './ProfileGeneral.scss';
import { DropdownTick } from '../../../components/common/DropdownTick/DropdownTick';
import { useParams } from 'react-router-dom';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { apiOTP } from '../../../services/axios/apiSendOTP';
import { apiLogin } from '../../../services/axios/apiLogin';
import { objToFormData } from '../../../utils';
import { login } from '../../../utils/auth';
import { doUpdateUser } from '../../../redux/slice/apiSlice/currentUserSlice';
import { useDispatch } from 'react-redux';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import { checkIsLogined } from '../../../utils/auth';
import { doGetCurrentUser } from '../../../redux/slice/apiSlice/currentUserSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { apiNotify } from '../../../services/axios/apiNotify';
import { dataGender } from '../../../constants';

export const ProfileGeneral = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const { dataUser } = useSelector((state: RootState) => {
    return state.currentUserReducer;
  });

  const [localImage, setLocalImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [genderChosen, setGenderChosen] = useState<{ key: number; value: string }[]>([]);

  const [otp, setOtp] = useState<string>('');
  const [gender, setGender] = useState<number>();
  const [newpassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isShowModalConfirmReturn, setIsShowModalConfirmReturn] = useState(false);
  const [isShowModalConfirmSave, setIsShowModalConfirmSave] = useState(false);
  const [isShowModalSuccess, setIsShowModaSuccess] = useState(false);

  const avatar = (location.state as { avatar: string | null })?.avatar;
  const file = (location.state as { file: File | null })?.file;

  const [listGenderOption, setListGenderOption] = useState<ListOption>([]);

  const [isDisableOTP, setIsDisableOTP] = useState<boolean>(true);
  const [sentOTP, setSentOTP] = useState<boolean>(true);

  const [isUpdated, setIsUpdated] = useState<boolean>(false);

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

  const previewImage = useMemo(() => {
    return file && URL.createObjectURL(file)
  }, [file]);


  useEffect(() => {
    if (avatar) {
      setLocalImage(avatar);
    }
  }, [avatar]);

  useEffect(() => {
    checkIsLogined()
      .then(res => {
        if(res) dispatch(doGetCurrentUser());
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (checkIsUpdatePage()) {
      if (dataUser?.FullName) setName(dataUser?.FullName);
      if (dataUser?.GenderId !== undefined && dataUser?.GenderText) {
        setListGenderOption([
          {
            key: dataUser?.GenderId,
            value: dataUser?.GenderText,
          },
        ]);
        // setGenderChosen([
        //   {
        //     key: dataUser.genderid,
        //     value: dataUser.gendertext,
        //   },
        // ]);
      }
      if (dataUser?.Phone) setPhone(dataUser?.Phone);
      if (dataUser?.Avatar && !avatar) setLocalImage(dataUser?.Avatar);
    }
  }, [dataUser]);

  useEffect(() => {
    if (checkIsUpdatePage() && dataUser.Phone) {
      if (phone === dataUser.Phone) {
        setIsDisableOTP(true);
      } else {
        setIsDisableOTP(false);
      }
    }
  }, [phone]);

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

  const checkValidPassword = () => {
    if (checkIsUpdatePage()) {
      if ((newpassword && confirmPassword) || (!newpassword && !confirmPassword)) {
        if (newpassword && confirmPassword) {
          return newpasswordValid && confirmPasswordValid;
        }
        return true;
      }
      return false;
    } else {
      return newpassword && confirmPassword && newpasswordValid && confirmPasswordValid;
    }
  };

  const checkOtpValid = () => {
    if (checkDisabledOTP()) {
      return true;
    } else {
      return otpValid;
    }
  };

  const handleCheckCompleteInfor = () => {
    if (
      nameValid &&
      genderValid &&
      phoneValid &&
      checkOtpValid() &&
      name &&
      phone &&
      listGenderOption.length &&
      // otp &&
      checkValidPassword()
    ) {
      return true;
    }
    return false;
  };

  const handleCheckValidAll = () => {
    if (!handleCheckCompleteInfor()) {
      if (!name) {
        setNameError('*Vui lòng nhập Họ và tên!');
        setNameValid(false);
      }
      if (!listGenderOption.length) {
        setGenderError('*Vui lòng chọn giới tính');
        setGenderValid(false);
      }
      if (!phone) {
        setPhoneError('*Vui lòng nhập số điện thoại!');
        setPhoneValid(false);
      }
      if (!checkDisabledOTP() && !otp) {
        setOtpError('*Vui lòng nhập OTP!');
        setOtpValid(false);
      }
      if (!newpassword && !checkValidPassword()) {
        setNewPasswordError('*Vui lòng nhập mật khẩu!');
        setNewPasswordValid(false);
      }
      if (!confirmPassword && !checkValidPassword()) {
        setConfirmPasswordError('*Vui lòng xác nhận mật khẩu!');
        setConfirmPasswordValid(false);
      }
      return false;
    }
    return true;
  };

  //handle when click back icon
  const handleReturn = () => {
    setIsShowModalConfirmReturn(true);
  };

  const handleSendOTP = () => {
    apiOTP
      .sendOTP({
        phone: phone,
        type: 'PHONE',
        action: 'VERIFIERTUTOR',
      })
      .then((res: any) => {
        if (res.result) {
          setSentOTP(true);
        }
      })
      .catch((error: any) => {
        setSentOTP(false);
      });
  };

  const checkOTP = async () => {
    let res = 0;
    await apiOTP
      .checkOTP({
        Phone: phone,
        Otp: otp,
      })
      .then((r: any) => {
        res = r.data.Result;
      })
      .catch(err => {
        res = 0;
      });
    return res;
    
  };
  const checkUserPhoneExit = (phone: string) => {
    if(phone) {
      apiLogin.checkPhoneUserExt({ phone: phone }).then(res => {
        if (res.data.Result === 1) {
          setPhoneError('* Số điện thoại đã có tài khoản sử dụng');
          setPhoneValid(false);
        } else {
          handleSendOTP();
        }
      });
    }
    else {
      setPhoneError('* Vui lòng nhập số điện thoại');
      setPhoneValid(false);
    }
  };

  const updateUser = () => {
    if (newpassword) {
      return apiLogin
        .updateUser(
          objToFormData({
            FullName: name,
            Phone: phone,
            GenderId: listGenderOption[0].key,
            Avatar: file,
            Password: newpassword,
          }),
        )
        .then(res => {
          previewImage && setLocalImage(previewImage);

          setIsUpdated(true);
          setIsShowModaSuccess(true);
        });
    } else {
      return apiLogin
        .updateUser(
          objToFormData({
            Fullname: name,
            Phone: phone,
            GenderId: listGenderOption[0].key,
            Avatar: file,
          }),
        )
        .then(res => {
          previewImage && setLocalImage(previewImage);
          setIsUpdated(true);
          setIsShowModaSuccess(true);
        });
    }
  };

  const handleSubmit = async () => {
    if (handleCheckValidAll()) {
      if (checkDisabledOTP()) {
        if (checkIsUpdatePage()) {
          setIsShowModalConfirmSave(true);
        } else {
          apiLogin
            .resgister(
              objToFormData({
                Fullname: name,
                Phone: phone,
                GenderId: listGenderOption[0].key,
                Avatar: file,
                Password: newpassword,
              }),
            )
            .then(res => {
              login(res.data.Content);
              dispatch(doUpdateUser(res.data.Content.User));
              apiNotify.CreateUpdateViewNoti();
              setIsShowModaSuccess(true);
            })
            .catch(error => {
              console.log('error', error);
            });
        }
      } else {
        await checkOTP().then(res => {
          if (res === 1) {
            setOtpValid(true);
            setOtpError('');
            if (checkIsUpdatePage()) {
              setIsShowModalConfirmSave(true);
            } else {
              apiLogin
                .resgister(
                  objToFormData({
                    Fullname: name,
                    Phone: phone,
                    GenderId: listGenderOption[0].key,
                    Avatar: file,
                    Password: newpassword,
                  }),
                )
                .then(res => {
                  login(res.data.Content);
                  dispatch(doUpdateUser(res.data.Content.User));
                  apiNotify.CreateUpdateViewNoti();
                  setIsShowModaSuccess(true);
                })
                .catch(error => {
                  console.log('error', error);
                });
            }
          } else {
            setOtpValid(false);
            setOtpError('*OTP không chinh xác');
          }
        });
      }
    } else {
      return;
    }
    //  apiLogin.resgister(objToFormData({
    //   fullname: name,
    //   phone: phone,
    //   genderid: listGenderOption[0].key,
    //   avatar: file,
    //   password: newpassword
    // })).then((res) => {
    //   login(res.data.content);
    //   dispatch(doUpdateUser(res.data.content.user))
    //   setIsShowModaSuccess(true);
    // })
    // .catch((error) => {
    //   console.log("error", error)
    // })
  };

  const renderHeaderTitle = (id: string | undefined) => {
    if (id === 'register') {
      return 'Đăng ký tài khoản';
    } else if (id === 'update') {
      return 'Cập nhật thông tin';
    } else return '';
  };

  const checkIsUpdatePage = () => {
    if (id === 'update') {
      return true;
    }
    return false;
  };
  const checkDisabledOTP = () => {
    if (checkIsUpdatePage()) return isDisableOTP;
    else return false;
  };

  return (
    <div className="profile-general">
      {/* <PageHeader title="Cập nhật thông tin" /> */}
      {/* <div className="page-header">
          <img src={closeIcon} alt="" className="back-icon" onClick={() => handleReturn()} />
          <h3 className="page-header-title">{renderHeaderTitle(id)}</h3>
        </div> */}
      <HeaderTitleMobile
        title={renderHeaderTitle(id)}
        onClick={() => {
          if (checkIsUpdatePage()) {
            if (isUpdated) {
              history(-1);
            } else {
              handleReturn();
            }
          } else {
            history(-1);
          }
        }}
      ></HeaderTitleMobile>
      <div className="profile-general__content">
        <div className="profile-general__main">
          <div className="profile-general__avatar">
            <Avatar
              image={localImage ? localImage : null}
              width={'150px'}
              height={'150px'}
              borderRadius={45}
              filter={'drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25))'}
              className="profile-general__avatar--image"
            />
            <Link
              state={{ avatar: localImage ? localImage : avatar }}
              to={`/profile-general/avatar/${checkIsUpdatePage() ? 'update' : 'register'}`}
            >
              <div className="profile-general__avatar--icon">
                <SvgCammera />
              </div>
            </Link>
          </div>
          <div className="input-wrapper">
            <p className="profile-general__main--label">Họ và tên</p>
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
            <p className="profile-general__main--label">Giới tính</p>
            <DropdownTick
              listOption={dataGender}
              isMultipleOption={false}
              setListChosenOption={(listGenderOption: ListOption) => {
                setListGenderOption(listGenderOption);
              }}
              placeholder="Giới tính"
              listChosenOption={listGenderOption}
            />
            <p className="input__error">{genderError}</p>
          </div>
          <div className="input-wrapper input-wrapper--otp">
            <p className="profile-general__main--label">Số điện thoại</p>
            <div className="profile-general__main--otp">
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
                  }}
                  onBlur={e => handleBlurPhone()}
                />
              </div>

              <Button
                type="button"
                className="profile-general__button--otp"
                onClick={() => checkUserPhoneExit(phone)}
                isBlur={checkDisabledOTP()}
                isDisable={checkDisabledOTP()}
              >
                Gửi OTP
              </Button>
            </div>
          </div>
          <div className="input-wrapper">
            <p className="profile-general__main--label">OTP</p>
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
              isDisable={checkDisabledOTP()}
              background={'#FFF'}
              backgroundDisable={'#DADADA'}
              type="number"
              maxLength={6}
              isNumber={true}
              error={otpError}
              onFocus={() => {
                setOtpError('');
              }}
              onBlur={e => handleBlurOTP()}
            />
          </div>
          <div className="input-wrapper">
            <p className="profile-general__main--label">{checkIsUpdatePage() ? "Mật khẩu mới":"Mật khẩu"}</p>
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
            <p className="profile-general__main--label">Nhập lại mật khẩu</p>
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
          <div className="profile-general__note update-profile-mobile__note--error">
            {/* <p>*Bạn vui lòng nhập đầy đủ thông tin</p> */}
          </div>
        </div>
      </div>
      <div className="profile-general__footer">
        <Button width={186} type="button" className="update-profile-mobile__button" onClick={() => handleSubmit()}>
          {checkIsUpdatePage() ? 'Cập nhật' : 'Đăng ký'}
        </Button>
      </div>

      {checkIsUpdatePage() && (
        <>
          <ModalConfirm
            isShow={isShowModalConfirmReturn}
            text={
              'Bạn chưa hoàn tất cập nhật, những cập nhật của bạn sẽ không được lưu lại. Bạn có chắc chắn muốn thoát?'
            }
            onClose={() => setIsShowModalConfirmReturn(false)}
            //navigateTo={'/profile'}
          />
          <ModalConfirm
            isShow={isShowModalConfirmSave}
            text={'Bạn có chắc chắn muốn cập nhật thông tin?'}
            onClose={() => setIsShowModalConfirmSave(false)}
            isReturnConfirm={false}
            handleSave={updateUser}
          />
          <ModalSuccess
            isShow={isShowModalSuccess}
            setIsShow={setIsShowModaSuccess}
            text={'Thông tin của bạn đã được cập nhật.'}
            clickOutside = {() => {
              history('/profile')
            }}
          />
        </>
      )}

      {!checkIsUpdatePage() && (
        <ModalSuccess
          isShow={isShowModalSuccess}
          setIsShow={setIsShowModaSuccess}
          text={'Chúc mừng bạn đã đăng ký tài khoản thành công.'}
          clickOutside={() => {
            history('/');
          }}
        />
      )}
    </div>
  );
};
