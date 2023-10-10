import React, { useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { BlackEye } from '../../../assets/svg/BlackEye';
import { Eye } from '../../../assets/svg/Eye';
import './Input.scss';

function getCoords(elem: any) {
  // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

export const Input: React.FC<IInput> = ({
  label,
  placeholder,
  onChange,
  type,
  pattern,
  validation,
  error,
  background,
  backgroundDisable,
  marginBottom,
  firstSubmitted,
  validateRequested,
  onBlur,
  name,
  id,
  isShowEge,
  subIcon,
  classNameIcon,
  isWhiteEye,
  isLockSpace,
  hasErr,
  isUpperCase,
  isDisable,
  maxLength,
  minLength,
  dummy,
  maxWidth,
  paddingLeft,
  className,
  value,
  onFocus,
  required,
  colorLabel,
  colorText,
  fontWeightLabel,
  forceUpdateValue,
  propGetValForceUpdate,
  notOnChangeWhenForceUpdate,
  onKeyPress,
  setValid,
  successFlag,
  typeAdmission,
  isClear,
  setName,
  isNumber,
}) => {
  const [errorText, setErrorText] = useState<string>('');
  const [getValue, setValue] = useState<string>('');
  const [isShowPass, setIsShowPass] = useState(false);
  const [missingError, setMissingError] = useState(false);
  const [clear, setClear] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setErrorText(error);
  }, [error, typeAdmission]);

  useEffect(() => {
    if (forceUpdateValue) {
      const val = propGetValForceUpdate ? forceUpdateValue[propGetValForceUpdate] : forceUpdateValue;
      // -100: signature for invalid value( set value to initial)
      if (val === -100) {
        // !notOnChangeWhenForceUpdate && onChange &&
        // onChange({ target: { value: '' } }, true);
        setValue('');
        return;
      }
      // !notOnChangeWhenForceUpdate && onChange && onChange({ target: { value: val } }, true)
      // ;

      setValue(val);
    }
  }, [forceUpdateValue]);

  const ref: any = useRef(null);
  const getKeyCode = (str: string) => {
    return str.charCodeAt(str.length - 1);
  };

  useEffect(() => {
    if (firstSubmitted) {
      if (required) {
        if (getValue === '') {
          setMissingError(true);
        } else {
          setMissingError(false);
        }
      }
    }
  }, [firstSubmitted, getValue]);

  const handleShowPass = () => {
    setIsShowPass(!isShowPass);
  };

  const handleOnKeyDown = (event: any) => {
    if (isLockSpace && event.keyCode == 32) {
      event.preventDefault();
      return false;
    }
  };

  const hanldeOnKeyUp = (event: any) => {
    //for android chrome keycode fix
    if (isLockSpace) {
      var inputValue = event.target.value;
      var charKeyCode = event.keyCode || event.which;
      if (charKeyCode === 0 || charKeyCode === 229) {
        charKeyCode = getKeyCode(inputValue);
      }
      if (charKeyCode === 32) {
        setTimeout(() => {
          event.target.value = event.target.value.trim().replace(/\s/g, '');
        }, 100);
      }
    }
  };

  const styleErr: any = {
    border: hasErr?.length > 0 ? `1px solid #BC3D3D` : '',
    textTransform: isUpperCase ? 'uppercase' : '',
    maxWidth: maxWidth,
    paddingLeft: paddingLeft,
  };

  useEffect(() => {
    if (hasErr) {
      // ref.current.scrollIntoView();
      const { top } = getCoords(ref.current);
      window.scrollTo({ behavior: 'smooth', top: top - 60 });
      // console.log(getCoords(ref.current));
    }
  }, [hasErr, dummy]);

  return (
    <div className={`input ${className ? className : ''}`} ref={ref}>
      <p
        style={{
          marginBottom: '5px',
          marginLeft: '10px',
          color: colorLabel,
          fontWeight: fontWeightLabel,
        }}
      >
        {label}
      </p>
      <input
        id={id}
        pattern={pattern}
        style={{
          background: background ? (isDisable ? backgroundDisable : background) : '',
          marginBottom: marginBottom ? `${marginBottom}px` : '0px',
          maxWidth: maxWidth,
          userSelect: isDisable === true ? 'none' : 'auto',
          color: colorText ? colorText : '#fff',
        }}
        className={`${missingError ? 'input-error' : ''}`}
        placeholder={placeholder}
        onFocus={onFocus}
        maxLength={maxLength}
        onChange={(e: any) => {
          validation === 'avgPoint' ? setValue(e.target.value.replace(',', '.')) : setValue(e.target.value);
          if (e && onChange) onChange(e);
        }}
        disabled={isDisable}
        value={value}
        type={isShowPass ? 'text' : type}
        onKeyPress={(e: any) => {
          if (validation === 'phone') {
            // if (e.target.value.length >= 10 && e.keyCode !== 8 && e.keyCode !== 46) {
            //   e.preventDefault();
            // }
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          } else if (validation === 'name') {
            if (e.target.value.length >= 30) {
              e.preventDefault();
            }
          } else if (validation === 'avgPoint') {
            // if (!/[0-9\.,]/.test(e.key) || e.target.value >= 10 || e.target.value.length >= 4) {
            //   e.preventDefault();
            // }
            if (!/[0-9\.,]/.test(e.key)) {
              e.preventDefault();
            }
          }
        }}
        onKeyUp={(e: any) => {
          if (validation === 'avgPoint') {
            if (
              !/^[0-9]{1,2}(\.[0-9]{1,2})?$/.test(e.target.value) &&
              !/^[0-9]{1,2}(\,[0-9]{1,2})?$/.test(e.target.value) &&
              e.target.value !== ''
            ) {
              setErrorText(' *Điểm nhập không hợp lệ!');
              setValid(false);
            } else if (parseFloat(e.target.value) > 10) {
              setErrorText(' *Điểm nhập không hợp lệ!');
              setValid(false);
            } else if (
              (parseFloat(e.target.value) == 0 && (typeAdmission == 1 || typeAdmission == 3)) ||
              (parseFloat(e.target.value) <= 2 && typeAdmission == 2)
            ) {
              setErrorText(' *Điểm liệt, vui lòng nhập lại!');
              setValid(false);
            } else {
              setErrorText('');
              setValid(true);
            }
          }

          if (firstSubmitted) {
            if (validation === 'email') {
              if (
                !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e.target.value) &&
                e.target.value !== ''
              ) {
                setErrorText('Email không hợp lệ!');
              } else {
                setErrorText('');
              }
            } else if (validation === 'phone') {
              if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(e.target.value) && e.target.value !== '') {
                setErrorText('Số điện thoại không hợp lệ!');
              } else {
                setErrorText('');
              }
            } else if (validation === 'name') {
              if (!/([a-zA-Z ])\w*/.test(e.target.value) && e.target.value !== '') {
                setErrorText('Tên không hợp lệ!');
              } else {
                setErrorText('');
              }
            } else if (validation === 'avgPoint') {
              if (
                !/^[0-9]{1,2}(\.[0-9]{1,2})?$/.test(e.target.value) &&
                !/^[0-9]{1,2}(\,[0-9]{1,2})?$/.test(e.target.value) &&
                e.target.value !== ''
              ) {
                setErrorText(' *Điểm nhập không hợp lệ!');
                setValid(false);
              } else if (parseFloat(e.target.value) > 10) {
                setValid(false);
                setErrorText(' *Điểm nhập không hợp lệ!');
              } else {
                setValid(true);
                setErrorText('');
              }
            }
          }
        }}
        onBlur={onBlur}
        inputMode={isNumber ? 'numeric' : 'text'}
      />
      {isShowEge && (
        <div className={`input__eye ${classNameIcon ? classNameIcon : ''}`} onClick={handleShowPass}>
          {subIcon || isWhiteEye ? <Eye /> : <BlackEye />}
        </div>
      )}
      {isClear && (isHover || clear) && (
        <div
          onClick={e => {
            e.stopPropagation();
            setName('');
          }}
          className="input__remove"
          style={{ display: value === '' ? 'none' : 'flex' }}
        >
          <IoIosClose />
        </div>
      )}
      {errorText !== '' && <p className="input__error">{errorText}</p>}
      {successFlag !== '' && <p className="input__success-flag">{successFlag}</p>}
    </div>
  );
};
