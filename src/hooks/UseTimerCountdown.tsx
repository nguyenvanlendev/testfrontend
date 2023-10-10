import { useEffect } from 'react';

export const useTimerCountdown = (seconds: number, setSeconds: any, isStart: boolean) => {
  let interval: any = null;

  useEffect(() => {
    if (isStart) {
      if (seconds === 0) {
        clearInterval(interval);
      } else {
        interval = setInterval(() => {
          setSeconds((seconds: number) => seconds - 1);
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [seconds, isStart]);

  return seconds;
};
