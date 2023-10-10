import axiosTutorToken from './axiosTutorToken';

export const apiNotify = {
  CreateUpdateViewNoti: () => {
    const url = 'notification/create-update-view-noti';
    return axiosTutorToken.post(url);
  },

  GetNumNewNoti: () => {
    const url = 'notification/get-num-new-noti';
    return axiosTutorToken.post(url);
  },

  GetListNotifycation: (param: { CurrentPage: number; CurrentDate: string; Limit: number}) => {
    const url = 'notification/get-list-notification';
    return axiosTutorToken.post(url, param);
  },

  NotificationSeen: (param: { NotificationId: number}) => {
    const url = 'notification/notification-seen';
    return axiosTutorToken.post(url, param);
  },
};
