import React from 'react';
import './InputText.scss';

export const InputText = React.forwardRef<any, IInput>(
  (
    {
      name,
      type,
      placeholder,
      classNameInput,
      classNameLabel,
      onChange,
      onkeypress,
      value,
      id,
      isLabel,
      label,
      HTMLFor,
      autoComplete,
      onFocus,
      autoFocus,
      subLabel,
      className,
      error,
      disabled,
    },
    ref,
  ) => {
    return (
      <div className={className || ''}>
        {label ? (
          <label htmlFor={HTMLFor} className={`inputs__label ${classNameLabel}`}>
            {label}
          </label>
        ) : (
          ''
        )}

        {subLabel ? <p className="inputs__sub-label">{subLabel}</p> : ''}

        <input
          id={id}
          className={`inputs ${classNameInput}`}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={onkeypress}
          onFocus={onFocus}
          value={value}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          ref={ref}
          disabled={disabled}
        />
        {error ? <span className="inputs__err">{error}</span> : null}
      </div>
    );
  },
);
