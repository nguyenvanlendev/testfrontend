import React, { useEffect, useState } from 'react';
import './ScheduleItem.scss';
import SessionItem from './SessionItem/SessionItem';

const ScheduleItem = ({
  weekdayid,
  label,
  sessiondays,
  listChosenWeekday,
  setListChosenWeekday,
  listChosenWeekdayInit,
  isDisabled
}: {
  weekdayid: number;
  label: string;
  sessiondays: ListSession;
  setListChosenWeekday: any;
  listChosenWeekday: ListWeekday[];
  listChosenWeekdayInit?: ListWeekday[];
  isDisabled: boolean
}) => {
  const [listChosenSession, setListChosenSession] = useState<ListSession[]>([]);

  const checkExistSession = (option: ListSession) => {
    const index = listChosenSession.findIndex((item: ListSession) => {
      return item.sessiondayid === option.sessiondayid;
    });

    if (index !== -1) return true;  
    return false;
  };

  const updateListChosenWeekday = (weekdayid: number, listChosenSession: ListSession[], listChosenWeekday: ListWeekday[]) => {    
    const postSessionWeek = [...listChosenWeekday].filter(item => {
      return item.weekdayid !== weekdayid;
    });

    const postSession = {
      weekdayid: weekdayid,
      sessiondays: listChosenSession,
    }

    return  [...postSessionWeek,postSession];
  };
 
  useEffect(() => {
    setListChosenWeekday(updateListChosenWeekday(weekdayid, listChosenSession, listChosenWeekday));
  }, [listChosenSession]);

  const handlePushSession = (option: ListSession) => {
    if (checkExistSession(option))
      setListChosenSession(
        [...listChosenSession].filter((item: ListSession) => {
          return option.sessiondayid !== item.sessiondayid;
        }),
      );
    else setListChosenSession([...listChosenSession, option]);
  };

  const handleRenderSession = (id: number) => {
    if (id == 10) return 'schedule-item__session--morning';
    if (id == 20) return 'schedule-item__session--noon';
    else return 'schedule-item__session--evening';
  };

  const getSessionsDays = (listChosenWeekdayInit: ListWeekday[] | undefined) => {
      if(listChosenWeekdayInit && listChosenWeekdayInit.length) {
        const z = listChosenWeekdayInit.find((item) => {
          return item.weekdayid == weekdayid
        })
        return z?.sessiondays || []
      }

      return []
  }

   
  useEffect(() => {
    setListChosenSession(getSessionsDays(listChosenWeekdayInit))
  },[listChosenWeekdayInit])

//console.log("listChosenSession",listChosenSession)
  return (
    <div className="schedule-item__wrapper">
      <div className="schedule-item__label">{label}</div>
      <div className="schedule-item__session">
        {sessiondays.map((item: ListSession, index: number) => {
          return (
            <SessionItem
              key={index}
              label={item.sessionday}
              className={handleRenderSession(item.sessiondayid)}
              isChoose={checkExistSession(item)}
              onClick={() => handlePushSession(item)}
              isDisabled  ={isDisabled}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleItem;
