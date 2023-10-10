import React, { useEffect, useState } from 'react';
import { CardPost } from '../../../components/common/CardPost/CardPost';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { TutorItem } from '../../../components/StudentPage/TutorItem/TutorItem';
import './NewPost.scss';
import { apiPost } from '../../../services/axios/apiPost';
import { apiTutor } from '../../../services/axios/apiTutor';
import { convertSubjectsToString } from '../../../components/StudentPage/ListTutor/ListTutor';
import { convertClassesToString } from '../../../components/StudentPage/ListTutor/ListTutor';
import { convertAreaListToString } from '../../../components/StudentPage/ListTutor/ListTutor';
import { useNavigate } from 'react-router-dom';
import { apiPostTutor } from '../../../services/axios/apiPostTutor';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import EmptyPost from './EmptyPost/EmptyPost';

import { Button } from '../../../components/common/Button/Button';
import ModalConfirm from '../../../components/common/ModalConfirm/ModalConfirm';
import { formatDateToDDMMYYYY } from '../../../helpers/app';
export const NewPost: React.FC = () => {
  const [listNumPost, setListNumPost] = useState<any>();
  const [post, setPost] = useState<any>();
  const [tutorRecommendList, setTutorRecommendList] = useState<ITutor[]>([]);
  const [tutorRegisteredList, setTutorRegisteredList] = useState<ITutor[]>([]);
  const [choosedTutor, setChoosedTutor] = useState<ITutor>();

  const [isShowModalSuccess, setIsShowModalSuccess] = useState<boolean>(false);
  const [isShowConfirmChangeTutorModal, setIsShowConfirmChangeTutorModal] = useState<boolean>(false);
  const [isShowDisableChangeTutorModal, setIsShowDisableChangeTutorModal] = useState<boolean>(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const navigate = useNavigate();

  useEffect(() => {
    let index = 0;

    apiPost.getMyListPost({ CurrentPage: 0, Limit: 0 }).then(res => {
      setListNumPost(res.data.Content.Post);
      if (urlParams.get('postid')) {
        index = res.data.Content.Post.findIndex((item: any) => {
          return item.Id == urlParams.get('postid');
        });

        if (index === -1) {
          index = 0;
        }
      }

      setPost(res.data.Content.Post[index]);

      apiTutor
        .getListTutorRecommend({
          CurrentPage: 0,
          Limit: 0,
          SubjectIds: [res.data.Content.Post[index].SubjectId],
          ClassIds: [res.data.Content.Post[index].ClassId],
          AreaIds:
            res.data.Content.Post[index] && res.data.Content.Post[index].PostAreas.length > 0
              ? res.data.Content.Post[index].PostAreas.map((item: any) => {
                  if (item.Id) {
                    return item.Id;
                  }
                })
              : [],
        })
        .then(res => {
          setTutorRecommendList(res.data.Content.Tutors);
        });
      apiTutor.getListRegisterTutor({ Status: 'Register', PostId: res.data.Content.Post[0].Id }).then(res => {
        setTutorRegisteredList(res.data.Content.Tutors);
      });
    });
  }, []);

  const handleSetPost = (id: number, subjectid: any, classid: any, num: any) => {
    const postByID =
      listNumPost &&
      listNumPost.filter((numId: any) => {
        return numId.Id === id;
      });

    setPost(postByID[0]);
    const areaids = num.PostAreas.map((item: any) => {
      return item.PostId;
    });

    apiTutor
      .getListTutorRecommend({
        CurrentPage: 0,
        Limit: 0,
        SubjectIds: [subjectid],
        ClassIds: [classid],
        AreaIds: areaids,
      })
      .then(res => {
        setTutorRecommendList(res.data.Content.Tutors);
      });
    apiTutor.getListRegisterTutor({ Status: 'Register', PostId: id }).then(res => {
      setTutorRegisteredList(res.data.Content.Tutors);
    });
  };

  const checkComfirmTeaching = () => {
    if (post.StartDate !== '0001-01-01T00:00:00' && post.NextFeeDate !== '0001-01-01T00:00:00') {
      return true;
    }
    return false;
  };

  //Lấy Tutor được chọn từ DS tutor đã đăng ký
  useEffect(() => {
    tutorRegisteredList?.map((item: ITutor) => {
      if (item.PostTutorId > 0 && item.StatusProcessId == 80 && item.PostId == post.Id) {
        setChoosedTutor(item);
      }
    });
  });
  const chooseTutor = (tutorid: number, postid: number) => {
    apiPostTutor.userChooseTutor({ PostId: postid, TutorId: tutorid }).then(res => {
      setIsShowModalSuccess(true);
    });
  };

  const removeChooseTutor = (tutorid: number, postid: number) => {
    apiPostTutor.userRemoveChooseTutor({ PostId: postid, TutorId: tutorid }).then(res => {});
  };
  // User choose recommend tutor
  const handleRegisterTutor = (tutorid: number, postid: number, item: any) => {
    setTutorRecommendList(
      [...tutorRecommendList].filter((i: any) => {
        return i.TutorId !== item.tutorid;
      }),
    );
    setTutorRegisteredList([...tutorRegisteredList, item]);
    apiPostTutor.userRegisterTutor({ PostId: postid, TutorId: tutorid }).then(res => {
      setIsShowModalSuccess(true);
    });
  };
  // redirect to edit post page
  const handleEditPost = (id: number) => {
    navigate(`/student/post-find-tutor/edit/${id}`);
  };
  // handle toggle Open/Close Post
  const handleOpenCloseToggle = (postid: number, isOpen: boolean) => {
    if (isOpen) {
      const cloneNumpost = [...listNumPost];
      apiPost.closePost({ PostId: postid });
      const index = cloneNumpost.findIndex(item => {
        return item.Id === postid;
      });

      cloneNumpost[index].IsOpen = false;
      setListNumPost(cloneNumpost);
    } else {
      const cloneNumpost = [...listNumPost];
      apiPost.openPost({ PostId: postid });
      const index = cloneNumpost.findIndex(item => {
        return item.Id === postid;
      });

      cloneNumpost[index].IsOpen = true;
      setListNumPost(cloneNumpost);
    }
  };

  //kiem tra user con thay doi gia su duoc hay k
  const handleCheckChangeTutor = (postid: number) => {
    apiPostTutor.checkChangeTutor({ PostId: postid }).then(res => {
      if (res.data.Result == 1) {
        setIsShowConfirmChangeTutorModal(true);
      } else setIsShowDisableChangeTutorModal(true);
    });
  };

  const handleChangeTutor = () => {
    apiPostTutor
      .updateStatusChangeTutor({
        PostTutorId: choosedTutor?.PostTutorId!,
        PostId: choosedTutor?.PostId!,
      })
      .then(res => {
        navigate(
          `/student/review-change-tutor?posttutorid=${choosedTutor?.PostTutorId}&postid=${choosedTutor?.PostId}`,
        );
      });
  };

  return (
    <>
      <HeaderTitleMobile title="Tin đăng của bạn" />
      {listNumPost?.length ? (
        <>
          <div className="post">
            <div className="post-menu" onClick={() => navigate('/student/post-find-tutor/post')}>
              +
            </div>
            <div className="post-list">
              {listNumPost &&
                listNumPost.map((num: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={num.Id === post?.Id ? 'post-menu active' : 'post-menu'}
                      onClick={() => handleSetPost(num.Id, num.SubjectId, num.ClassId, num)}
                    >
                      {num.NamePost}
                    </div>
                  );
                })}
            </div>
          </div>
          {post && post.Id > 0 && (
            <CardPost
              id={post?.Id}
              title={`Tìm gia sư ${post?.SubjectText} ${
                post?.PostTeachingForms[0] ? post?.PostTeachingForms[0].Title : ''
              }`}
              schedule={post?.PostSessionWeeks}
              timepost={formatDateToDDMMYYYY(post?.PostDate)}
              name={post?.FullName}
              classes={post?.ClassText ? post?.ClassText : 'Chưa có'}
              location={post?.PostAreas[0] ? post?.PostAreas[0].Title : 'Chưa có'}
              isOpen={true}
              isOpenPost={post?.IsOpen}
              handleEditPost={() => handleEditPost(post?.Id)}
              handleOpenCloseToggle={handleOpenCloseToggle}
              isConfirmTeaching={checkComfirmTeaching()}
              startdate={formatDateToDDMMYYYY(post.StartDate)}
              nextfeedate={formatDateToDDMMYYYY(post.NextFeeDate)}
            />
          )}

          {!checkComfirmTeaching() || choosedTutor === undefined ? (
            <>
              <div className="tutor">
                <h4>Gia sư đã đăng ký</h4>
                <div className="tutor__list">
                  {tutorRegisteredList?.map((item: ITutor, index: number) => (
                    <TutorItem
                      id={item?.TutorId}
                      img={item?.Avatar}
                      subjects={item.TutorSubjectLists ? convertSubjectsToString(item.TutorSubjectLists) : ''}
                      grades={item.TutorClassLists ? convertClassesToString(item.TutorClassLists) : ''}
                      addresses={item.TutorAreaLists ? convertAreaListToString(item.TutorAreaLists) : ''}
                      numberStar={item?.TotalRating}
                      name={item?.FullName}
                      isHorizontal={true}
                      key={index}
                      isFromNewPostPage={true}
                      clickWhenChosen={() => {
                        removeChooseTutor(item?.TutorId, post.Id);
                      }}
                      clickWhenNotChosen={() => {
                        chooseTutor(item?.TutorId, post.Id);
                      }}
                      ischosen={item.IsChoose}
                      textBtnWhenChosen="Đã chọn"
                      textBtnWhenNotChosen="Chọn dạy"
                      onClickTotal={() => {
                        navigate(
                          `/student/tutor-detail- /${item.TutorId}?isFromProfile=1&postid=${post?.Id}&ischosen=${item.IsChoose}`,
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="tutor">
                <h4>Gia sư phù hợp</h4>
                <div className="tutor__list">
                  {tutorRecommendList?.map((item: ITutor, index: number) => (
                    <TutorItem
                      id={item?.TutorId}
                      img={item?.Avatar}
                      subjects={item.TutorSubjectLists ? convertSubjectsToString(item.TutorSubjectLists) : ''}
                      grades={item.TutorClassLists ? convertClassesToString(item.TutorClassLists) : ''}
                      addresses={item.TutorAreaLists ? convertAreaListToString(item.TutorAreaLists) : ''}
                      numberStar={item?.TotalRating}
                      name={item?.FullName}
                      isHorizontal={true}
                      onClick={() => handleRegisterTutor(item?.TutorId, post.Id, item)}
                      clickWhenNotChosen={() => handleRegisterTutor(item?.TutorId, post.Id, item)}
                      key={index}
                      onClickTotal={() => {
                        navigate(
                          `/student/tutor-detail-info/${item.TutorId}?isFromProfile=1&postid=${post?.Id}&ischosen=${item.IsChoose}`,
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="tutor">
              <h4>Gia sư đã chọn</h4>
              <div className="tutor__list">
                {choosedTutor && (
                  <TutorItem
                    id={choosedTutor?.TutorId}
                    img={choosedTutor?.Avatar}
                    subjects={
                      choosedTutor?.TutorSubjectLists ? convertSubjectsToString(choosedTutor.TutorSubjectLists) : ''
                    }
                    grades={choosedTutor?.TutorClassLists ? convertClassesToString(choosedTutor.TutorClassLists) : ''}
                    addresses={choosedTutor?.TutorAreaLists ? convertAreaListToString(choosedTutor.TutorAreaLists) : ''}
                    numberStar={choosedTutor?.TotalRating}
                    name={choosedTutor?.FullName}
                    isHorizontal={true}
                    isFromNewPostPage={true}
                    onClickTotal={() => {
                      navigate(
                        `/student/tutor-detail-info/${choosedTutor.TutorId}?change-tutor=1&postid=${choosedTutor.PostId}`,
                      );
                    }}
                    isHiddenBtn={true}
                  />
                )}
              </div>
            </div>
          )}

          {checkComfirmTeaching() && choosedTutor !== undefined && (
            <div className="new-post__footer">
              <Button width={304} onClick={() => handleCheckChangeTutor(post?.Id)}>
                Thay đổi gia sư
              </Button>
            </div>
          )}

          <ModalSuccess
            isShow={isShowModalSuccess}
            text="Lời mời dạy của bạn đã được gửi thành công. YOTUTOR sẽ xem và phản hồi bạn sớm nhất nhé!"
            setIsShow={setIsShowModalSuccess}
          />

          <ModalConfirm
            isShow={isShowConfirmChangeTutorModal}
            text="Gia sư của bạn đang còn trong giai đoạn dạy thử 1 tuần. Bạn sẽ được thay đổi gia sư tối đa 2 lần."
            text2="Bạn có chắc chắn muốn đổi?"
            isReturnConfirm={false}
            onClose={() => {
              setIsShowConfirmChangeTutorModal(false);
            }}
            handleSave={() => handleChangeTutor()}
          />

          <ModalConfirm
            isShow={isShowDisableChangeTutorModal}
            text="Bạn đã thay đổi gia sư quá số lần quy định. Vui lòng liên hệ YOTUTOR để được tư vấn."
            text2="0937 737 777 - HOTLINE YOTUTOR"
            isReturnConfirm={false}
            onlyAgree={true}
            isHighlightText={true}
            onClose={() => {
              setIsShowDisableChangeTutorModal(false);
            }}
            handleSave={() => setIsShowDisableChangeTutorModal(false)}
          />
        </>
      ) : (
        <EmptyPost />
      )}
    </>
  );
};
