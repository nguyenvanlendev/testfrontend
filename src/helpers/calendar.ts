import { currDate } from '../constants/data';

export const isLeapYear = (year: any) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

export const getFebDays = (year: any) => {
  return isLeapYear(year) ? 29 : 28;
};

export const daysOfMonth = (month: any, year: any) => {
  let first_day = new Date(year, month, 1);
  let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let arrayDays = [];

  //Get day of week of first day

  //Get the day of the week with monday as the first day
  let dayOfWeekOfFirstDay = new Date(year, month, first_day.getDate()).getDay();
  let startDate = dayOfWeekOfFirstDay == 0 ? -5 : 2 - dayOfWeekOfFirstDay;

  for (let i = startDate; i <= days_of_month[month]; i++) {
    const timeData = {
      day: i,
      month,
      year,
      dayOfWeek: new Date(year, month, i).getDay(),
    };

    arrayDays.push(timeData);
  }

  return arrayDays;
};

export const checkEqualDate = (time: Date) => {
  if (
    time.getFullYear() === currDate.getFullYear() &&
    time.getDate() === currDate.getDate() &&
    time.getMonth() === currDate.getMonth()
  ) {
    return true;
  }
  return false;
};

export const generateYearNextPerivous = (year?: number) => {
  let currYear = year || currDate.getFullYear();
  const years = [];
  years.push(currYear);
  for (let i = 1; i < 12; i++) {
    years.push(currYear + i);
    years.unshift(currYear - i);
  }
  years.unshift(currYear - 12);
  return years;
};

export const generateYearPrev = (year?: number) => {
  const years = [];
  if (year) {
    for (let i = 0; i < 24; i++) {
      years.unshift(year - i - 1);
    }
  } else {
    let currYear = currDate.getFullYear();
    for (let i = 1; i < 12; i++) {
      years.push(currYear + i);
      years.unshift(currYear - i);
    }
    years.unshift(currYear - 12);
    years.push(currYear);
  }

  return years.sort();
};

export const generateYearNext = (year?: number) => {
  const years = [];
  if (year) {
    for (let i = 0; i < 24; i++) {
      years.push(year + i + 1);
    }
  } else {
    let currYear = currDate.getFullYear();
    for (let i = 1; i < 12; i++) {
      years.push(currYear + i);
      years.unshift(currYear - i);
    }
    years.unshift(currYear - 12);
    years.push(currYear);
  }

  return years.sort();
};

type TypeValidateDateCalendar = {
  year: number;
  month: number;
  date: number;
};

export const has31Days = (month: number) => {
  if (month === 1) {
    return true;
  }
  if (month === 3) {
    return true;
  }
  if (month === 5) {
    return true;
  }
  if (month === 7) {
    return true;
  }
  if (month === 8) {
    return true;
  }
  if (month === 10) {
    return true;
  }
  if (month === 12) {
    return true;
  }

  return false;
};

export const validateDateCalendar = ({ year, month, date }: TypeValidateDateCalendar) => {
  if (isLeapYear(year) && month === 1 && date > 29) {
    date = 29;
  }
  if (!isLeapYear(year) && month === 1 && date > 28) {
    date = 28;
  }

  if (month !== 1 && !has31Days(month + 1) && date > 30) {
    date = 30;
  }

  return {
    year,
    month,
    date,
  };
};

export const iOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

export const formatDate = (input:any) => {
  var datePart = input.match(/\d+/g),
  year = datePart[0].substring(2), // get only two digits
  month = datePart[1], day = datePart[2];

  return day+'/'+month+'/'+year;
}

//formatDate ('2010/01/18'); 
