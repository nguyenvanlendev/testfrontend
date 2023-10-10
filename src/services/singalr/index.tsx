import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { readCookie } from '../../utils';
import { ETokenName } from '../../constants';

import { setCookie } from '../../utils';
import { doUpdateListNoti } from '../../redux/slice/apiSlice/notiffycationSlice';
import { doUpdateNumNoti } from '../../redux/slice/apiSlice/numNotifSlice';


import { useDispatch } from 'react-redux';


export const Signalr = () => {
  const token = readCookie(ETokenName.TUTOR_ACCESS_KEY);
  const [connection, setConnection] = useState<any>(null);
  
  const dispatch = useDispatch();
  useEffect(() => {
    const newconnection = new HubConnectionBuilder()
      .withUrl(process.env.URL_NOTI + "/tutorHub")
      .withAutomaticReconnect()
      .build();
   
    setConnection(newconnection);
  }, []);
  
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          const domain = process.env.COOKIE_DOMAIN;
          connection.invoke('connect', token, readCookie("connectionId") || "").then(() => {
            console.log('Connected!');
          });
          setCookie(365, connection.connectionId, "connectionId", domain);

          connection.on("tutorProject", (message:any) => {
            dispatch(doUpdateListNoti(
              {...message,timenotification:"0"}
            ))
            dispatch(doUpdateNumNoti())
          });

        })
        .catch((error:any) => console.log('Could not connect', error));
    }
  }, [connection]);

  return<div></div>;
};

