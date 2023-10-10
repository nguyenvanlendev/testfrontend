import moment from "moment";

export const cumulativeOffsetElement = (element: any): { top: number; left: number } => {
  let top = 0,
    left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top,
    left: left,
  };
};

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export const detectTouchScreen = () => {
  return 'ontouchstart' in window;
};

export const formatTimeVideo = (timeInSeconds: number): { minutes: string; seconds: string } => {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};


export const formatDateToDDMMYYYY = (rawDate: string) => {
  const date = moment(rawDate, 'YYYY-MM-DDTHH:mm:ss');
  const formattedDate = date.format('DD/MM/YYYY');
  return formattedDate;
};
