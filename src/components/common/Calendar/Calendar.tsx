import React, { useEffect, useRef, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { SvgNextMonth, SvgPreMonth } from '../../../assets/svg';
import { currDate } from '../../../constants/data';
import {
  checkEqualDate,
  daysOfMonth,
  generateYearNext,
  generateYearNextPerivous,
  generateYearPrev,
  validateDateCalendar,
} from '../../../helpers/calendar';
import { Button } from '../Button/Button';
import './Calendar.scss';

export const Calendar: React.FC<ICalendar> = ({
  onSelect,
  value,
  isShow,
  getTime,
  isBeforeNow,
  constraintDateBefore,
  constraintDateAfter,
}) => {
  const [isShowMonth, setIsShowMonth] = useState(false);
  const [isShowYears, setIsShowYears] = useState(false);

  const [month, setMonth] = useState(value?.getMonth() || currDate.getMonth());
  const [year, setYear] = useState(value?.getFullYear() || currDate.getFullYear());
  // const [time, setTime] = useState(currDate);

  const [listYears, setListYear] = useState(generateYearNextPerivous());
  const [dateSelected, setDateSelected] = useState(
    value ? new Date(value?.getFullYear(), value?.getMonth(), value?.getDate()) : new Date(),
  );

  const constraintDay = constraintDateBefore?.getDate();

  const constraintMonth = constraintDateBefore?.getMonth();
  const constraintFullYear = constraintDateBefore?.getFullYear();

  const constraintDayAfter = constraintDateAfter?.getDate();
  const constraintMonthAfter = constraintDateAfter?.getMonth();
  const constraintYearAfter = constraintDateAfter?.getFullYear();

  const handleSelectMonth = () => {
    setIsShowYears(false);
    setIsShowMonth(true);
  };

  const handleChooseMonth = (i: number) => {
    setMonth(i);
    setIsShowMonth(false);

    if (onSelect && value) {
      let date = value?.getDate();
      let month = i;
      let year = value?.getFullYear();

      const {
        date: newDate,
        month: newMonth,
        year: newYear,
      } = validateDateCalendar({
        year,
        month,
        date,
      } as any);

      setDateSelected(new Date(newYear, newMonth, newDate));
      return onSelect(new Date(newYear, newMonth, newDate));
    }
  };

  const handleSelectYear = (year: number) => {
    setIsShowMonth(false);
    setListYear(generateYearNextPerivous(year));
    setIsShowYears(true);
  };

  const handleChooseYears = (year: number) => {
    setYear(year);
    setIsShowYears(false);

    if (onSelect && value) {
      let date = value?.getDate();
      let month = value?.getMonth();
      let yearValue = year;
      const {
        date: newDate,
        month: newMonth,
        year: newYear,
      } = validateDateCalendar({
        year: yearValue,
        month,
        date,
      } as any);

      setDateSelected(new Date(newYear, newMonth, newDate));
      return onSelect(new Date(newYear, newMonth, newDate));
    }
  };

  const handleChooseDay = (time: { day: number; month: number; year: number }) => {
    if (onSelect) {
      setDateSelected(new Date(time.year, time.month, time.day));
      return onSelect(new Date(time.year, time.month, time.day));
    }
  };

  const handlePreviousYear = () => {
    setListYear(generateYearPrev(listYears[0]));
  };

  const handleNextYear = () => {
    setListYear(generateYearNext(listYears[listYears.length - 1]));
  };

  const handlePreMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year => year - 1);
      return;
    }
    setMonth(month => month - 1);
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year => year + 1);
      return;
    }
    setMonth(month => month + 1);
  };

  const handleClickComplete = () => {
    let currentDate = new Date();
    isShow();
    if (
      (constraintDateBefore &&
        (dateSelected.getTime() - constraintDateBefore?.getTime()) / (1000 * 60 * 60 * 24) < 0) ||
      (constraintDateAfter && (constraintDateAfter.getTime() - dateSelected?.getTime()) / (1000 * 60 * 60 * 24) < 0)
    )
      return;

    if (dateSelected > currentDate) {
      getTime(null);
      return;
    }
    getTime(dateSelected);
  };

  useEffect(() => {
    if (value) {
      let daySelected = new Date(value).getDate();
      let monthSelected = new Date(value).getMonth();
      let yearSelected = new Date(value).getFullYear();
      if (daySelected !== 0) {
        // setTime(new Date(yearSelected, monthSelected, daySelected));
      }
    }
  }, [value]);

  const detectEnableYear = (year: number) => {
    let nowYear = new Date().getFullYear();
    if (year <= nowYear) {
      return true;
    }
    return false;
  };

  const classeNameDays = (itemTime: Date, dayOfWeek: number, isDisabled: any) => {
    let className = dayOfWeek === 0 ? 'calendar__sunday' : '';
    if (checkEqualDate(itemTime) && itemTime.getDate() > 0) {
      className = className + 'calendar__current-day';
    }
    if (
      dateSelected &&
      dateSelected.getDate() === itemTime.getDate() &&
      dateSelected.getMonth() === itemTime.getMonth() &&
      dateSelected.getFullYear() === itemTime.getFullYear() &&
      dateSelected.getMonth() === month
    ) {
      className = className + ' calendar__select-day';
    }
    if (isDisabled) className += ' calendar__disabled-day';
    return className;
  };

  useEffect(() => {
    if (constraintMonth && year === constraintFullYear && month < constraintMonth) {
      setMonth(constraintMonth);
    }
  }, [year]);

  useEffect(() => {
    if (
      (constraintDay &&
        year === constraintFullYear &&
        month === constraintMonth &&
        constraintDay > dateSelected.getDate()) ||
      (constraintDayAfter &&
        year === constraintYearAfter &&
        month === constraintMonthAfter &&
        constraintDayAfter < dateSelected.getDate())
    ) {
      setDateSelected(new Date());
    }
  }, [month]);

  useEffect(() => {
    // console.log(constraintDateBefore, constraintDay, month, value, value?.getMonth());
    if (value) setMonth(value?.getMonth());
    if ((constraintFullYear && constraintFullYear > year) || (constraintYearAfter && constraintYearAfter < year)) {
      //Default year will be set to the year of birth of the main group of students attending the national
      //high school exam of the current year
      if (constraintDateBefore) setYear(new Date().getFullYear() - 18);
      else setYear(new Date().getFullYear());
      setMonth(0);
    }
    if (
      (constraintMonth && constraintMonth > month && year === constraintFullYear) ||
      (constraintMonthAfter && constraintMonthAfter > month && year === constraintYearAfter)
    ) {
      setMonth(constraintMonth || 0);
    }
  }, []);

  return (
    <div className="calendar">
      <div className="calendar__only">
        <div className="calendar__header">
          {isShowMonth ||
          (!isShowYears && constraintFullYear === year && constraintMonth === month) ||
          (isShowYears && constraintFullYear && constraintFullYear > listYears[0]) ? (
            <div className="calendar__icon-angle" onClick={() => {}} style={{ opacity: 0, cursor: 'default' }}>
              <SvgPreMonth color="white" />
            </div>
          ) : (
            <div className="calendar__icon-angle" onClick={isShowYears ? handlePreviousYear : handlePreMonth}>
              <SvgPreMonth color="white" />
            </div>
          )}

          <div className="calendar__box-month-year">
            <div className="calendar__picker calendar__month-picker" onClick={handleSelectMonth}>
              {`Tháng ${month + 1}`}
            </div>
            <div
              className="calendar__picker calendar__year-picker"
              onClick={async () => {
                handleSelectYear(year);
              }}
            >
              <div className="calendar__year">{year}</div>
            </div>
          </div>

          {isShowMonth ||
          (!isShowYears && constraintYearAfter === year && constraintMonthAfter === month) ||
          (isShowYears && constraintYearAfter && constraintYearAfter < listYears[listYears.length - 1]) ? (
            <div className="calendar__icon-angle" onClick={() => {}} style={{ opacity: 0, cursor: 'default' }}>
              <SvgNextMonth color="white" />
            </div>
          ) : (
            <div className="calendar__icon-angle" onClick={isShowYears ? handleNextYear : handleNextMonth}>
              <SvgNextMonth color="white" />
            </div>
          )}
        </div>
        <div className="calendar__body">
          {isShowMonth ? (
            <div className="calendar__list">
              {Array.from(Array(12).keys()).map((item, i) => {
                const isDisbled =
                  (year === constraintFullYear && constraintMonth && item < constraintMonth) ||
                  (year === constraintYearAfter && constraintMonthAfter && item > constraintMonthAfter);

                return (
                  <div
                    className={`${month === item ? 'active-item' : ''}  ${isDisbled ? 'disable-item' : ''}`}
                    key={i}
                    onClick={() => !isDisbled && handleChooseMonth(i)}
                  >
                    {item + 1}
                  </div>
                );
              })}
            </div>
          ) : isShowYears ? (
            <div className={'calendar__list '}>
              {listYears.map((item: any, i: any) => {
                const isDisbled =
                  (constraintFullYear && item < constraintFullYear) ||
                  (constraintYearAfter && item > constraintYearAfter);

                return (
                  <div
                    key={i}
                    // onClick={() => {
                    //   if (isBeforeNow) {
                    //     if (detectEnableYear(item)) {
                    //       handleChooseYears(item);
                    //     }
                    //   } else {
                    //     handleChooseYears(item);
                    //   }
                    // }}
                    onClick={() => !isDisbled && handleChooseYears(item)}
                    // className={
                    //   year === item
                    //     ? 'active-item'
                    //     : isBeforeNow
                    //     ? detectEnableYear(item)
                    //       ? ''
                    //       : 'disable'
                    //     : ''
                    // }
                    className={`${year === item ? 'active-item' : ''}  ${isDisbled ? 'disable-item' : ''}`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="calendar__week-day">
                <div>T2</div>
                <div>T3</div>
                <div>T4</div>
                <div>T5</div>
                <div>T6</div>
                <div>T7</div>
                <div>CN</div>
              </div>
              <div className="calendar__divider" />
              <div className="calendar__days">
                {daysOfMonth(month, year).map((item: any, i: any) => {
                  const isDisabled =
                    (month === constraintMonth &&
                      year === constraintFullYear &&
                      constraintDay &&
                      constraintDay > item.day) ||
                    (month === constraintMonthAfter &&
                      year === constraintYearAfter &&
                      constraintDayAfter &&
                      constraintDayAfter < item.day);

                  return (
                    <div
                      key={i}
                      onClick={() => !isDisabled && handleChooseDay(item)}
                      style={{ pointerEvents: item.day > 0 ? 'auto' : 'none' }}
                      className={classeNameDays(new Date(item.year, item.month, item.day), item.dayOfWeek, isDisabled)}
                    >
                      {item.day > 0 && item.day}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="calendar__group-btn">
        <Button type="button" className="calendar__btn" onClick={() => handleClickComplete()}>
          Xong
        </Button>
      </div>
    </div>
  );
};
