import React, { useEffect, useRef, useState } from 'react';
import './TextArea.scss';

const TextArea: React.FC<ITextArea> = ({
  id,
  className,
  placeholder,
  rows,
  value,
  maxLength,
  disabled = false,
  onFocus,
  onBlur,
  onChange,
  error,
}) => {
  const ref: any = useRef(null);

  const [Value, setValue] = useState<string>('');

  const [errorText, setErrorText] = useState<string>('');

	  useEffect(() => {
      setErrorText(error!);
    }, [error]);

  return (
    <div className={`textarea ${className ? className : ''}`} ref={ref}>
      <textarea
        name=""
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e: any) => {
          setValue(e.target.value);
          if (e && onChange) onChange(e);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      {errorText !== '' && <p className="textarea__error">{errorText}</p>}
      {/* {successFlag !== '' && <p className="textarea__success-flag">{successFlag}</p>} */}
    </div>
  );
};

export default TextArea;
