import React, { useEffect, useRef, useState } from 'react';

export const useDidMountEffect = (func: () => (() => void) | void, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};
