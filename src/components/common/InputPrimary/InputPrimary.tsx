import React, { useState } from 'react';
import { Eye } from '../../../assets/svg';
import './InputPrimary.scss';

export const InputPrimary: React.FC<IInputPrimary> = ({
  placeholder,
  value,
  onChange,
  type,
  error,
  className,
  name,
  id,
  onBlur,
  isShowEge,
  subIcon,
  onClick,
  classNameInput,
  classNameIcon,
  disabled,
  autoComplete,
  handleClickIcon,
  isLockSpace,
}) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const handleShowPass = () => {
    setIsShowPass(!isShowPass);
  };

  const handleOnKeyDown = (event: any) => {
    if (isLockSpace && event.keyCode == 32) {
      event.preventDefault();
      return false;
    }
  };

  const getKeyCode = (str: string) => {
    return str.charCodeAt(str.length - 1);
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

  return (
    <div className={`input-primary ${className ? className : ''}`} onClick={onClick}>
      <div className="input-primary__container">
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={isShowPass ? 'text' : type}
          className={`input-primary__input ${classNameInput ? classNameInput : ''}`}
          name={name}
          id={id}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete="off"
          onKeyDown={handleOnKeyDown}
          onKeyUp={hanldeOnKeyUp}
        />
        {isShowEge && (
          <div
            className={`input-primary__eye ${classNameIcon ? classNameIcon : ''}`}
            onClick={() => {
              if (type === 'password') handleShowPass();
              else if (handleClickIcon) {
                handleClickIcon();
              }
            }}
          >
            {subIcon || <Eye />}
          </div>
        )}
      </div>
      {error ? <span className="input-primary__err">{error}</span> : null}
    </div>
  );
};
