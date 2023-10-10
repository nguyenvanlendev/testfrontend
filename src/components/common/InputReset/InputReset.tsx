import React, { useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import '../Input/Input.scss';

export const InputReset: React.FC<IInputReset> = ({
  label,
  placeholder,
  onChange,
  validation,
  error,
  background,
  marginBottom,
  firstSubmitted,
  onBlur,
  id,
  isDisable,
  maxLength,
  maxWidth,
  value,
  onFocus,
  colorLabel,
  fontWeightLabel,
  isReset,
}) => {
  const [errorText, setErrorText] = useState<string>('');
  // const [inputValue, setValue] = useState<string>(value || '');
  const [missingError, setMissingError] = useState(false);

  // useEffect(() => {
  //   setValue(value || '');
  // }, [value, id])

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  const ref: any = useRef(null);
  
  const handleReset = () => {
    onChange('');
  }

  return (
    <div className="input" ref={ref}>
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
        style={{
          background: background ? background : '',
          marginBottom: marginBottom ? `${marginBottom}px` : '0px',
          maxWidth: maxWidth,
          userSelect: isDisable === true ? 'none' : 'auto',
        }}
        className={`${missingError ? 'input-error' : ''}`}
        placeholder={placeholder}
        onFocus={onFocus}
        maxLength={maxLength}
        onChange={(e: any) => {
          // setValue(e.target.value);
          if (e && onChange) onChange(e.target.value);
        }}
        disabled={isDisable}
        value={value}
        type={'text'}
        onKeyPress={(e: any) => {
          if (validation === 'phone') {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          } else if (validation === 'name') {
            if (e.target.value.length >= 30) {
              e.preventDefault();
            }
          }
        }}
        onKeyUp={(e: any) => {
          if (validation === 'email') {
            if (
              !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e.target.value) &&
              e.target.value !== ''
              ) {
              setErrorText('Email không hợp lệ');
            } else {
                setErrorText('');
            }
          } else if (validation === 'phone') {
            if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(e.target.value) && e.target.value !== '') {
              setErrorText('Số điện thoại không hợp lệ');
            } else {
              setErrorText('');
            }
          } else if (validation === 'name') {
            if (!/([a-zA-Z ])\w*/.test(e.target.value) && e.target.value !== '') {
              setErrorText('Tên không hợp lệ');
            } else {
              setErrorText('');
            }
          }
        }}
        onBlur={onBlur}
      />
      {isReset && (
        <div className='input__reset' onClick={handleReset}>
          <FiX size={16} />
        </div>
      )}
      {errorText !== '' && <p className="input__error">{errorText}</p>}
    </div>
  );
};
