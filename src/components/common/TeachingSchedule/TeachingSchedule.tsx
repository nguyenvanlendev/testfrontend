import React, { useEffect, useState } from 'react';
import ScheduleItem from '../ScheduleItem/ScheduleItem';
import './TeachingSchedule.scss';

const TeachingSchedule = ({ setListChosenWeekdayMother, listChosenInitWeekday, isDisabled = false }: any) => {
  const sessionweeks = [
    {
      weekdayid: 10,
      weekdayname: 'Thứ 2',
      sessiondays: [
        {
          sessiondayid: 10,
          sessionday: 'Buổi sáng',
        },
        {
          sessiondayid: 20,
          sessionday: 'Buổi trưa',
        },
        {
          sessiondayid: 30,
          sessionday: 'Buổi tối',
        },
      ],
    },
    {
      weekdayid: 20,
      weekdayname: 'Thứ 3',
      sessiondays: [
        {
          sessiondayid: 10,
          sessionday: 'Buổi sáng',
        },
        {
          sessiondayid: 20,
          sessionday: 'Buổi trưa',
        },
        {
          sessiondayid: 30,
          sessionday: 'Buổi tối',
        },
      ],
    },
    {
      weekdayid: 30,
      weekdayname: 'Thứ 4',
      sessiondays: [
        {
          sessiondayid: 10,
          sessionday: 'Buổi sáng',
        },
        {
          sessiondayid: 20,
          sessionday: 'Buổi trưa',
        },
        {
          sessiondayid: 30,
          sessionday: 'Buổi tối',
        },
      ],
    },
    {
      weekdayid: 40,
      weekdayname: 'Thứ 5',
      sessiondays: [
        {
          sessiondayid: 10,
          sessionday: 'Buổi sáng',
        },
        {
          sessiondayid: 20,
          sessionday: 'Buổi trưa',
        },
        {
          sessiondayid: 30,
          sessionday: 'Buổi tối',
        },
      ],
    },
    {
      weekdayid: 50,
      weekdayname: 'Thứ 6',
      sessiondays: [
        {
          sessiondayid: 10,
          sessionday: 'Buổi sáng',
        },
        {
          sessiondayid: 20,
          sessionday: 'Buổi trưa',
        },
        {
          sessiondayid: 30,
          sessionday: 'Buổi tối',
        },
      ],
    },
    {
      weekdayid: 60,
      weekdayname: 'Thứ 7',
      sessiondays: [
        {
          sessiondayid: 10,
          sessionday: 'Buổi sáng',
        },
        {
          sessiondayid: 20,
          sessionday: 'Buổi trưa',
        },
        {
          sessiondayid: 30,
          sessionday: 'Buổi tối',
        },
      ],
    },
    {
      weekdayid: 70,
      weekdayname: 'CN',
      sessiondays: [
        {
          sessiondayid: 10,
          sessionday: 'Buổi sáng',
        },
        {
          sessiondayid: 20,
          sessionday: 'Buổi trưa',
        },
        {
          sessiondayid: 30,
          sessionday: 'Buổi tối',
        },
      ],
    },
  ];

  const [listChosenWeekday, setListChosenWeekday] = useState<ListWeekday[]>([]);

  // useEffect(() => {
  //   setListChosenWeekday(listChosenInitWeekday)
  // },[listChosenInitWeekday])
  //  console.log("listChosenWeekday",listChosenWeekday)

  return (
    <div className="teaching-schedule__wrapper">
      {sessionweeks.map((item: { weekdayid: number; weekdayname: string; sessiondays: ListSession }) => {
        return (
          <ScheduleItem
            key={item.weekdayid}
            weekdayid={item.weekdayid}
            label={item.weekdayname}
            sessiondays={item.sessiondays}
            setListChosenWeekday={(list: ListWeekday) => {
              setListChosenWeekday(list);
              setListChosenWeekdayMother(list);
            }}
            listChosenWeekday={listChosenWeekday}
            listChosenWeekdayInit={listChosenInitWeekday}
            isDisabled={isDisabled}
          />
        );
      })}
    </div>
  );
};

export default TeachingSchedule;
