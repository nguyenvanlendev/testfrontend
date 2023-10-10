import React from 'react';
import './InputSearch.scss';

export const InputSearch = React.forwardRef<any, IInputSearch>(
  (
    {
      label,
      placeholder,
      maxLength,
      value,
      onChange,
      onBlur,
      onkeypress,
      onkeyup,
      type,
      borderRadius,
      width,
      height,
      background,
      className,
      name,
      error,
      paddingRight,
      paddingLeft,
      onKeydown,
      isSalary,
      zIndex = 1,
      pattern,
      isCreateNewCV,
      min,
      onInput,
      inputmode,
      marginLeft,
      marginRight,
      readOnly,
      disabled,
      caution,
      showErrorModal,
      onFocus,
    },
    ref,
  ) => {
    return (
      <div className={`inputform`} style={{ zIndex }}>
        {error && showErrorModal ? (
          <div
            className={`inputform__error-modal ${!label ? 'inputform__error-modal--no-label' : ''}`}
          >
            <div className="inputform__error-modal--content">
              <span>{error}</span>
            </div>
            <div className={`inputform__error-modal__triangle--container`}>
              <div className={`inputform__error-modal__triangle`}></div>
            </div>
          </div>
        ) : null}

        {label && <p className="inputform__label">{label}</p>}
        <div
          className={`inputform__container ${className} 
          ${error ? 'inputform__error' : ''}`}
          style={{
            borderRadius,
            height,
            width,
            background,
            paddingRight,
            paddingLeft,
            marginLeft,
            marginRight,
          }}
        >
          <input
            placeholder={placeholder}
            name={name}
            maxLength={maxLength}
            onKeyPress={onkeypress}
            value={value}
            onChange={onChange}
            type={type}
            onBlur={onBlur}
            onKeyUp={onkeyup}
            onKeyDown={onKeydown}
            ref={ref}
            autoComplete="off"
            pattern={pattern}
            min={min}
            onInput={onInput}
            onFocus={onChange}
            inputMode={inputmode}
            step="any"
            readOnly={readOnly}
            disabled={disabled}
          />
        </div>
        {caution ? <div className="inputform__caution">{caution}</div> : null}
      </div>
    );
  },
);
