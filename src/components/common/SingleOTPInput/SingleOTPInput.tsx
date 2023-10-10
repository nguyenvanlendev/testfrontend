import React from 'react';
import { memo, useLayoutEffect, useRef } from 'react';
import { usePrevious } from '../../../hooks';
import './SingleOTPInput.scss';

const SingleOTPInput: React.FC<ISingleOTPInput> = (props) => {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <>
      <input ref={inputRef} {...rest} className={`single-otp-input ${rest.className}`} />
    </>
  );
};

export default memo(SingleOTPInput);
