import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import tutorProfileImage from '../../../assets/img/draft/tutorProfileImage.png';
import CardProfile from '../../../components/common/CardProfile/CardProfile';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { MyCardPost } from '../../../components/common/MyCardPost/MyCardPost';
import { PostActionType } from '../../../constants/tutorPost';
import { RootState, useAppSelector } from '../../../redux';
import {
  doGetMyListMatchingPost,
  doGetMyListRegisterPost,
} from '../../../redux/slice/apiSlice/post';
import { doGetTutorProfiles } from '../../../redux/slice/apiSlice/tutorProfiles';
import { apiPostTutor } from '../../../services/axios/apiPostTutor';
import { apiTutor } from '../../../services/axios/apiTutor';
import { converseArrayToString } from '../../../utils';
import { checkIsLogined } from '../../../utils/auth';
import './YourProfiles.scss';
import EmptyTutorProfile from '../TutorProfiles/EmptyTutorProfile';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';

const YourProfiles = () => {
  const firstRender = useRef(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state
  const [tutorProfiles, setTutorProfiles] = useState<ITutor[]>([]);
  const [currentProfile, setCurrentProfile] = useState<ITutor>();
  const [matchingPosts, setMatchingPosts] = useState<IPostNew[]>([]);
  const [registerPosts, setRegisterPosts] = useState<IPostNew[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);

  const { tutorProfiles: ListTutorProfiles } = useSelector((state: RootState) => state.getTutorProfiles);
  
  
  let activeProfileId = useMemo(() => {
    return currentProfile && currentProfile.TutorId;
  }, [currentProfile]);

  let isOpenProfile = useMemo(() => {
    return currentProfile && currentProfile.IsOpen === 1 ? true : false;
  }, [currentProfile]);

  const handleMatchingPostClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, postid: number) => {
    event.preventDefault();
    if (postid && currentProfile && currentProfile.TutorId > 0) {
      let res = await apiPostTutor.tutorRegisterPost({ PostId: postid, TutorId: currentProfile.TutorId });
      if (res.data.Result === 1) {
        handleGetPost();
      }
    }
  };

  const handleRegisterPostClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    postid: number,
    ischoosefinal?: number,
  ) => {
    event.preventDefault();
    let res: any = null;
    if (postid && currentProfile && currentProfile.TutorId > 0) {
      let _registedPosts = _.cloneDeep(registerPosts);
      let index = _registedPosts.findIndex(post => post.Id === postid);
      let post = _registedPosts[index];
      if (post.IsChooseFinal === ischoosefinal) {
        if (ischoosefinal === 1) {
          // Khi da chon roi thi khong quay lai chon day
          // res = await apiPostTutor.tutorRemoveChoosePost({ PostId: postid, TutorId: currentProfile.TutorId });
          // if (res && res.data?.Result === 1) {
          //   post.IsChooseFinal = 0;
          // }
        } else {
          res = await apiPostTutor.tutorChoosePost({ PostId: postid, TutorId: currentProfile.TutorId });
          if (res && res.data?.Result === 1) {
            setIsShow(true);
            post.IsChooseFinal = 1;
          }
        }
      }
      setRegisterPosts(_registedPosts);
    }
  };

  useEffect(() => {
    handleGetTutorProfiles();
  }, []);

  useEffect(() => {
    if (ListTutorProfiles.length > 0 && firstRender.current) {
      setTutorProfiles(ListTutorProfiles);
      setCurrentProfile(ListTutorProfiles[0]);
      firstRender.current = false;
      return;
    } else {
      setTutorProfiles(ListTutorProfiles);
    }
  }, [ListTutorProfiles]);

  useEffect(() => {
    handleGetPost();
  }, [currentProfile]);

  const handleGetTutorProfiles = async () => {
    const isLogin = await checkIsLogined();
    let payloadTutorProfiles: IParamCreateGetListTutor = {
      CurrentPage: 0,
      Limit: 0,
      Status: 'MyProfile',
      FindString: '',
      GenderId: -1,
      AcademicLevelId: 0,
      PostId: 0,
      SubjectIds: [],
      ClassIds: [],
      TeachingFormIds: [],
      AreaIds: [],
    };

    if (isLogin) {
      dispatch(doGetTutorProfiles(payloadTutorProfiles));
    }
  };

  const handleActiveProfile = (tutorId?: number) => {
    if (tutorId) {
      const tutorProfile = tutorProfiles.find(tutorProfile => tutorProfile.TutorId === tutorId);
      setCurrentProfile(tutorProfile);
    }
  };

  const handleGetPost = () => {
    const tutorid = currentProfile?.TutorId;
    let subjectids =
      currentProfile?.TutorSubjectLists &&
      currentProfile.TutorSubjectLists.map(item => {
        return item.SubjectId;
      });
    let classids =
      currentProfile?.TutorClassLists &&
      currentProfile.TutorClassLists.map(item => {
        return item.ClassId;
      });
    let areaids =
      currentProfile?.TutorAreaLists &&
      currentProfile.TutorAreaLists.map(item => {
        return item.AreaId;
      });

    if (tutorid && subjectids && classids && areaids) {
      if (tutorid > 0 && currentProfile.TutorId === tutorid) {
        const handlePayLoad = (action: any) => {
          let obj: IParamGetMyListPost = {
            CurrentPage: 0,
            Limit: 0,
            TutorId: tutorid,
            Action: action,
            SubjectIds: subjectids,
            ClassIds: classids,
            AreaIds: areaids,
          };
          return obj;
        };

        Promise.all([
          dispatch(doGetMyListMatchingPost(handlePayLoad(PostActionType.MatchingPost))),
          dispatch(doGetMyListRegisterPost(handlePayLoad(PostActionType.RegisterPost))),
        ]).then(values => {
          let rawValues: any[] = [...values];
          for (let i = 0; i < rawValues.length; i++) {
            let isArrEmpty = rawValues[i]?.payload?.Content?.Post?.length;
            if (i === 0) {
              let matchPosts = isArrEmpty > 0 ? rawValues[i].payload.Content.Post : [];
              setMatchingPosts(matchPosts);
            } else if (i === 1) {
              let registedPosts = isArrEmpty > 0 ? rawValues[i].payload.Content.Post : [];
              setRegisterPosts(registedPosts);
            } else {
              return;
            }
          }
        });
      }
    }
  };

  const handleSetOpenProfile = async (isOpen: boolean, tutorId: number) => {
    if (currentProfile) {
      let res =
        isOpen === true ? await apiTutor.postOpenProfileTutor(tutorId) : await apiTutor.postCloseProfileTutor(tutorId);
      if (res.data.Result === 1) {
        setTutorProfiles(
          tutorProfiles.map(tutor => {
            if (tutor.TutorId !== tutorId) return tutor;
            return { ...tutor, IsOpen: isOpen === true ? 1 : 0 };
          }),
        );
        setCurrentProfile({
          ...currentProfile,
          IsOpen: isOpen === true ? 1 : 0,
        });
      }
    }
  };

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/tutor/profiles/new?isFrom=tutor');
  };
  return (
    <>
      {tutorProfiles && tutorProfiles.length > 0 ? (
        <div className="your-profiles">
          <div className="your-profiles__header">
            <HeaderTitleMobile title="Hồ sơ của bạn" />
          </div>
          <div className="your-profiles__main">
            {tutorProfiles && tutorProfiles.length > 0 && (
              <div className="profile">
                <div className="profile-add" onClick={(e)=>handleNavigate(e)}>+</div>
                <div className="profile-list">
                  {tutorProfiles.map((profile, index: number) => (
                    <div
                      key={`profile-key-${profile.TutorId}`}
                      className={
                        profile.TutorId === activeProfileId ? `profile-list__item active` : `profile-list__item`
                      }
                      onClick={() => handleActiveProfile(profile.TutorId)}
                    >
                      {profile?.NameProfile}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentProfile && (
              <CardProfile
                userid={currentProfile.TutorUserId}
                tutorid={currentProfile.TutorId}
                isOpenProfile={isOpenProfile}
                onSetIsOpenProfile={(isOpen: boolean, tutorId: number) => handleSetOpenProfile(isOpen, tutorId)}
                name={currentProfile.FullName}
                subjects={currentProfile.TutorSubjectLists}
                grades={currentProfile.TutorClassLists}
                addresses={currentProfile.TutorAreaLists}
                profileImage={currentProfile.Avatar || tutorProfileImage}
                totalrating={currentProfile.TotalRating}
                statusProcessId = {currentProfile.StatusProcessId}

              />
            )}
            {currentProfile?.StatusProcessId !== 10 && isOpenProfile && <>
            {registerPosts && registerPosts.length > 0 && (
              <div className="profile-received">
                <h3 className="title">Tin đăng đã nhận</h3>
                {registerPosts.map((post, index) => {
                  
                  return (
                    <MyCardPost
                      key={`post-regitser-key-${post.ClassId}-${index}`}
                      Id={post.Id}
                      SubjectText={post.SubjectText}
                      PostSessionWeeks={post.PostSessionWeeks}
                      PostDate={post.PostDate}
                      FullName={post.FullName}
                      ClassText={post.ClassText}
                      postareasText={converseArrayToString(post.PostAreas as IPostTeachingFroms[])}
                      onClick={(event, postid, ischoosefinal) => handleRegisterPostClick(event, postid, ischoosefinal)}
                      buttonText={post.IsChooseFinal === 1 ? 'Đã chọn' : 'Chọn dạy'}
                      isOpenPost={false}
                      PostTeachingForms={post.PostTeachingForms}
                      IsChooseFinal={post.IsChooseFinal}
                      navigate = {() => {
                        navigate(`/tutor/class-details/${post.Id}?isFromProfiles=true`)
                      }}
                    />
                  );
                })}
              </div>
            )}
            {matchingPosts && matchingPosts.length > 0 && (
              <div className="suitable-profile">
                <h3 className="title">Tin đăng phù hợp</h3>
                {matchingPosts.map((post, index) => {
                  return (
                    <MyCardPost
                      key={`post-matching-key-${post.ClassId}-${index}`}
                      Id={post.Id}
                      SubjectText={post.SubjectText}
                      PostSessionWeeks={post.PostSessionWeeks}
                      PostDate={post.PostDate}
                      FullName={post.FullName}
                      ClassText={post.ClassText}
                      postareasText={converseArrayToString(post.PostAreas as IPostTeachingFroms[])}
                      onClick={(event, postid) => handleMatchingPostClick(event, postid)}
                      buttonText={'Đăng ký'}
                      isOpenPost={false}
                      PostTeachingForms={post.PostTeachingForms}
                      navigate = {() => {
                        navigate(`/tutor/class-details/${post.Id}?isFromProfiles=true`)
                      }}
                    />
                  );
                })}
              </div>
            )}  </>}
           
          </div>
        </div>
      ) : (
        <EmptyTutorProfile onClick={handleNavigate} />
      )}
      <ModalSuccess
        isShow={isShow}
        setIsShow={setIsShow}
        text={'Bạn đã đăng ký dạy thành công. YOTUTOR sẽ xem và phản hồi bạn sớm nhất nhé!'}
      />
    </>
  );
};

export default YourProfiles;
