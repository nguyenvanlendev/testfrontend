import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import PageHeader from '../common/PageHeader/PageHeader';
import NotificationItem from './NotificationItem/NotificationItem';
import './NotificationMobile.scss';
import { useNavigate } from 'react-router-dom';
import { apiNotify } from '../../services/axios/apiNotify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LIMIT_NOTI } from '../../constants';
import { doGetListNoti } from '../../redux/slice/apiSlice/notiffycationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { doGetMoreNoti } from '../../redux/slice/apiSlice/notiffycationSlice';
import { checkIsLogined } from '../../utils/auth';
import { doClearListnoti } from '../../redux/slice/apiSlice/notiffycationSlice';

const NotificationMobile = () => {
  //const [listNoti, setListNoti] = useState<INotiItem[]>([]);

  const { listNoti } = useSelector((state: RootState) => {
    return state.listNotiReducer;
  });
  const history = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    checkIsLogined().then((res) => {
      if(res) {
        apiNotify.CreateUpdateViewNoti();
        dispatch(
          doGetListNoti({
            CurrentPage: 0,
            CurrentDate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            Limit: LIMIT_NOTI,
          }),
      );
      }
      else {
        dispatch(doClearListnoti())
      }
    })
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      apiNotify
        .GetListNotifycation({
          CurrentPage: currentPage,
          CurrentDate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
          Limit: LIMIT_NOTI,
        })
        .then(res => {
          dispatch(doGetMoreNoti(res.data.Content.Notifications));
          setHasMore(res.data.Content.Notifications.length === LIMIT_NOTI);
        });
    }
  }, [currentPage]);

  const fetchMoreData = () => {
    setCurrentPage(prev => prev + 1);
  };
  
  const converContentNoti = (
    initContent: string,
    typenotificationid: number,
    res: { Subject: string; Teachingform: string; Teachingtime: string;Numprofile:string},
  ) => {
      let result = initContent
        .replace('{subject}', res.Subject)
        .replace('{teachingform}', res.Teachingform)
        .replace('{teachingtime}', res.Teachingtime)
        .replace('{numprofile}', res.Numprofile);

      return result;
  };

  const converPropToObj = (
    SubjectName: string,
    PostTeachingForms: { Id: number; Title: string; PostId: number }[],
    IsFlexibleTime: number,
    NumSession: number,
    NumProfile: number
  ) => {
    let teachingtime = IsFlexibleTime ? 'Linh hoạt' : NumSession ? NumSession + ' buổi/tuần' : '';

    return {
      Subject: SubjectName,
      Teachingform: PostTeachingForms[0]?.Title || '',
      Teachingtime: teachingtime,
      Numprofile: NumProfile.toString()
    };
  };

  const converContentTotal = (
    Content: string,
    TypeNotificationId: number,
    SubjectName: string,
    PostTeachingForms: { Id: number; Title: string; PostId: number }[],
    IsFlexibleTime: number,
    NumSession: number,
    NumProfile: number
  ) => {
    const res = converPropToObj(SubjectName, PostTeachingForms, IsFlexibleTime, NumSession,NumProfile);
    return converContentNoti(Content, TypeNotificationId, res);
  };

  const navigateWithTypeNoti = (notiItem: INotiItem) => {
    if (notiItem.TypeNotificationId === 1 || notiItem.TypeNotificationId === 2 || notiItem.TypeNotificationId === 4) {
      history('/student/new-post?postid=' + notiItem.PostId);
    } else if (notiItem.TypeNotificationId === 3) {
      history('/tutor/class-details/' + notiItem.PostId + "?isFromProfiles=true");
    } else if (notiItem.TypeNotificationId === 5) {
      history('/profile');
    }
    else if(notiItem.TypeNotificationId === 6) {
      history('/tutor/your-profiles?tutorid=' + notiItem.TutorId);
    }
    else if(notiItem.TypeNotificationId === 7) {
      history('/student/tutor-detail-info/'+ notiItem.TutorId + '?delete-profile=1')
    }
  };

  let flagTime = moment(new Date()).format('YYYY/MM/DD');

  return (
    <div className="notification-layout">
      <PageHeader title="Thông báo"/>
      <div className="notification-content">
      {listNoti.length ? <InfiniteScroll
          dataLength={listNoti.length}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollThreshold={0.6}
          loader={<div>Loading....</div>}
        >
          {listNoti?.map((item, index) => {
            let notificationTime = item.TimeNotification == "0" ?"0":moment(item.TimeNotification).format('YYYY/MM/DD');
            let flag = false;
            if (index === 0 || (notificationTime !== "0" && flagTime !== "0" && moment(notificationTime).isSame(flagTime) === false)) {
              flag = true;
            }
            flagTime = notificationTime;
            let isToday = item.TimeNotification == "0" || moment(notificationTime).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY');
            return (
              <Fragment key={index}>
                {flag ? (
                  <div className="notification-content__title">
                    <p>{isToday ? 'Hôm nay' : moment(notificationTime).format('DD/MM/YYYY')}</p>
                  </div>
                ) : null}
                <NotificationItem
                  onClick={() => {
                    apiNotify.NotificationSeen({
                      NotificationId: item.NotificationId || 0,
                    });
                    navigateWithTypeNoti(item);
                  }}
                  avatar={'https://yoot.vn/wp-content/uploads/2020/03/Frame.png'}
                  description={converContentTotal(
                    item.Content || '',
                    item.TypeNotificationId || 0,
                    item.SubjectName || '',
                    item.PostTeachingForms || [],
                    item.IsFlexibleTime || 0,
                    item.NumSession || 0,
                    item.NumProfile || 0
                  )}
                  datetime={notificationTime == "0" ? "Vừa xong":moment(notificationTime).format('DD/MM/YYYY').toString()}
                  isSeen={item.IsSeen}
                />
              </Fragment>
            );
          })}
        </InfiniteScroll>:"Chưa có tin tức"
}
      </div>
    </div>
  );
};

export default NotificationMobile;
