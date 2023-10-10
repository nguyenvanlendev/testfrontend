import React, { useEffect, useState } from 'react';
import tutorDetailInfo from '../../../assets/img/draft/tutorDetailInfo.png';
import certificate from '../../../assets/img/draft/certificate.png';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { ListStar } from '../../../components/StudentPage/ListStar/ListStar';
import './TutorDetailsInfo.scss';
import { Button } from '../../../components/common/Button/Button';
import TextArea from '../../../components/common/TextArea/TextArea';
import ModalConfirm from '../../../components/common/ModalConfirm/ModalConfirm';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import { useNavigate, useParams } from 'react-router-dom';
import ModalImage from '../../../components/common/ModalImage/ModalImage';
import { apiTutor } from '../../../services/axios/apiTutor';
import moment from 'moment';
import { apiPostTutor } from '../../../services/axios/apiPostTutor';
import ModalAuthen from '../../../components/common/ModalAuthen/ModalAuthen';
import { ModalButtons } from '../../../constants';
import { checkIsLogined } from '../../../utils/auth';
import { apiReviewTutor } from '../../../services/axios/apiReviewTutor';

const TutorDetailsInfo = () => {
  const history = useNavigate();
  const tutorId = useParams();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const postid = urlParams.get('postid');
  const isFromProfile = urlParams.get('isFromProfile');
  const deleteProfile = urlParams.get('delete-profile');
  const changeTutor = urlParams.get('change-tutor');
  const ischosen = urlParams.get('ischosen');

  const [isInfoTab, setIsInfoTab] = useState<boolean>(true);

  const [srcImage, setSrcImage] = useState<string>(certificate);
  const [indexImage, setIndexImage] = useState<number>(1);
  const [reviewContent, setReviewContent] = useState<string>('');

  const [infoTutor, setInfoTutor] = useState<ITutor>();
  const [isLogined, setIsLogined] = useState<boolean>(false);

  const [isShowAuthenModal, setIsShowAuthenModal] = useState<boolean>(false);
  const [isShowImageModal, setIsShowImageModal] = useState<boolean>(false);
  const [isShowExitConfirmModal, setIsShowExitConfirmModal] = useState<boolean>(false);
  const [isShowRateModal, setIsShowRateModal] = useState<boolean>(false);
  const [isShowContinueRateModal, setIsShowContinueRateModal] = useState<boolean>(false);
  const [isShowSuccessRateModal, setIsShowSuccessRateModal] = useState<boolean>(false);
  const [isShowDeleteConfirmModal, setIsShowDeleteConfirmModal] = useState<boolean>(false);
  const [isShowSuccessRegisterModal, setIsShowSuccessRegisterModal] = useState<boolean>(false);
  const [isShowSuccessDeleteProfileModal, setIsShowSuccessDeleteProfileModal] = useState<boolean>(false);
  const [isShowConfirmChangeTutorModal, setIsShowConfirmChangeTutorModal] = useState<boolean>(false);
  const [isShowDisableChangeTutorModal, setIsShowDisableChangeTutorModal] = useState<boolean>(false);

  const [numberStar, setNumberStar] = useState<number>(0);
  const [indexStar, setIndexStar] = useState<number>(0);

  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const isPermitRate = infoTutor?.PostTutorId != 0 ? true : false;
  const [isPermitDelete, setIsPermitDelete] = useState<boolean>(false);

  const [isChosenTutor, setIsChosenTutor] = useState<boolean>(false);

  useEffect(() => {
    if (ischosen === '1') setIsChosenTutor(true);
  }, [ischosen]);

  const isDeleteProfilePage = () => {
    if (queryString === '?delete-profile=1') {
      return true;
    }
    return false;
  };

  const renderOptionButton = () => {
    if (deleteProfile) return 'Xóa hồ sơ';
    else if (changeTutor) return 'Thay đổi gia sư';
    else if (isFromProfile) return isChosenTutor ? 'Đã chọn' : 'Chọn dạy';
    else return infoTutor?.IsRegister === 1 ? 'Chọn dạy' : 'Đăng ký';
  };

  const handleOptionButtonClick = () => {
    if (deleteProfile) {
      isPermitDelete ? setIsShowDeleteConfirmModal(true) : () => {};
    } else if (changeTutor) {
      handleCheckChangeTutor(postid);
    } else if (isFromProfile) {
      handleChosenTutor(tutorId.id!, event);
    } else handleRegister(tutorId.id!, event);
  };

  //get API info tutor
  useEffect(() => {
    apiTutor
      .getInfoTutor({
        TutorId: tutorId.id,
        IsUpdate: isDeleteProfilePage() ? 1 : 0,
        PostId: changeTutor ? postid : 0,
      })
      .then(res => {
        setInfoTutor(res.data.Content.Tutor);
      });
  }, [tutorId]);

  //API get review tutor
  useEffect(() => {
    if (isInfoTab == false) {
      checkIsLogined().then(res => {
        if(res) apiReviewTutor
        .getReviewTutor({
          PostTutorId: infoTutor?.PostTutorId!,
        })
        .then(res => {
          if (res.data.Content) {
            setIndexStar(res.data.Content.Review.Rating);
            setReviewContent(res.data.Content.Review.Content);
            setIsReviewed(true);
          }
        });
        
      });
      
    }
  }, [isInfoTab]);

  const handleOpenImageModal = (e: any, index: number, src: string) => {
    e.stopPropagation();
    setIsShowImageModal(true);
    setSrcImage(src);
    setIndexImage(index);
  };

  const handleRegister = (id: number | string, e: any) => {
    e.stopPropagation();
    if (isLogined) {
      if (infoTutor?.IsRegister === 1) return;
      else {
        apiPostTutor
          .userRegisterPost({
            PostId: isFromProfile ? postid : 0,
            TutorId: +id,
          })
          .then(res => {
            if (res.data.Result) {
              setIsShowSuccessRegisterModal(true);
            } else setIsShowSuccessRegisterModal(false);
          })
          .catch(error => {
            console.log('error', error);
          });
      }
    } else {
      setIsShowAuthenModal(true);
    }
  };

  const handleChosenTutor = (id: number | string, e: any) => {
    if (!isChosenTutor) {
      apiPostTutor
        .userChooseTutor({
          PostId: isFromProfile ? postid : 0,
          TutorId: +id,
        })
        .then(res => {
          if (res.data.Result) {
            setIsShowSuccessRegisterModal(true);
          } else setIsShowSuccessRegisterModal(false);
        });
    }
    return;
  };

  const handleReturnAfterRegister = () => {
    if (isFromProfile) history('/student/new-post');
    else history('/student/find-tutor');
  };

  useEffect(() => {
    setNumberStar(indexStar + 1);
  }, [indexStar]);

  const handleSubmitRate = () => {
    if (indexStar != 0) setIsShowRateModal(true);
    else setIsShowContinueRateModal(true);
  };

  const handleSaveRate = (e: any) => {
    e.stopPropagation();
    apiReviewTutor
      .createReviewTutor({
        PostTutorId: infoTutor?.PostTutorId!,
        Rating: indexStar,
        Content: reviewContent,
        //điều kiện tạo đánh giá gia sư đã dạy
        TypeReviewId: 10,
        StatusProcessId: 80,
      })
      .then(res => {
        setIsShowSuccessRateModal(true);
        setIsReviewed(true);
      });
  };

  useEffect(() => {
    checkIsLogined().then(res => {
      setIsLogined(res);
    });
  }, []);

  useEffect(() => {
    if (!isPermitRate) {
      setIsDisable(true);
    }
  }, [isPermitRate]);

  useEffect(() => {
    if (isPermitRate && !isReviewed) setIsDisable(false);
    else setIsDisable(true);
  }, [isPermitRate, isReviewed]);

  //APi get permission delete profile tutor
  useEffect(() => {
    if (queryString.includes('?delete-profile=1')) {
      apiTutor
        .getCheckPermissionDeleteTutor({
          TutorId: tutorId.id,
        })
        .then(res => {
          if (res.data.Result == 1) {
            setIsPermitDelete(true);
          }
        });
    }
  }, [tutorId]);

  const handleDeleteProfile = (e: any) => {
    e.stopPropagation();
    apiTutor.postDeleteProfileTutor(tutorId.id!).then(res => {
      setIsShowSuccessDeleteProfileModal(true);
    });
  };

  //kiem tra user con thay doi gia su duoc hay k
  const handleCheckChangeTutor = (postid: any) => {
    apiPostTutor.checkChangeTutor({ PostId: postid }).then(res => {
      if (res.data.Result == 1) {
        setIsShowConfirmChangeTutorModal(true);
      } else setIsShowDisableChangeTutorModal(true);
    });
  };

  const handleChangeTutor = () => {
    apiPostTutor
      .updateStatusChangeTutor({
        PostTutorId: infoTutor?.PostTutorId!,
        PostId: postid!,
      })
      .then(res => {
        history(`/student/review-change-tutor?posttutorid=${infoTutor?.PostTutorId}&postid=${postid}`);
      });
  };

  return (
    <div className="tutor-detail-info">
      <HeaderTitleMobile
        onClick={() => {
          if (!isInfoTab && isPermitRate && !isReviewed) {
            setIsShowExitConfirmModal(true);
          } else history(-1);
        }}
      />
      <div className="tutor-detail-info__cover-content">
        <img src={infoTutor?.Avatar || tutorDetailInfo} alt="" className="cover-image" />
        <div className="cover-info">
          <h3 className="cover-info--name">{infoTutor?.FullName}</h3>
          <ListStar score={infoTutor?.TotalRating} number={infoTutor?.TotalRating! + 1 || 0} />
        </div>
      </div>
      <div className="tutor-detail-info__content-table">
        {!isDeleteProfilePage() && (
          <div className="header-wrapper">
            <div
              className={`header-option ${isInfoTab ? 'header-option--selected' : ''}`}
              onClick={() => {
                setIsInfoTab(true);
              }}
            >
              Thông tin
            </div>
            <div
              className={`header-option ${!isInfoTab ? 'header-option--selected' : ''}`}
              onClick={() => {
                setIsInfoTab(false);
              }}
            >
              Đánh giá
            </div>
          </div>
        )}
        <div className="content-body">
          {isInfoTab ? (
            <div className="content-body--info">
              <div className="general-info">
                <div className="general-info--item">
                  <div className="title-item">Ngày sinh</div>
                  <div className="desc-item">{moment(infoTutor?.BirthDate).format('DD/MM/YYYY')}</div>
                </div>
                <div className="general-info--item">
                  <div className="title-item">Trình độ</div>
                  <div className="desc-item">{infoTutor?.AcademicLevelName}</div>
                </div>
                <div className="general-info--item">
                  <div className="title-item">Kinh nghiệm</div>
                  <div className="desc-item">
                    {/* <ul>
                      <li>1 năm gia sư Tiếng Anh cho các em cấp 2</li>
                      <li>1 năm làm trợ giảng cho lớp Tiếng Anh trung tâm anh ngữ VUS - Việt Mỹ</li>
                    </ul> */}
                    {infoTutor?.Experience}
                  </div>
                </div>
              </div>
              <div className="teaching-info">
                <div className="teaching-info--item">
                  <div className="title-item">Đăng ký môn</div>
                  <div className="teaching-option-list">
                    {infoTutor?.TutorSubjects.map((item, index) => {
                      return (
                        <div className="teaching-option-item" key={index}>
                          {item.SubjectName}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="teaching-info--item">
                  <div className="title-item">Đăng ký lớp</div>
                  <div className="teaching-option-list">
                    {infoTutor?.TutorClasses.map((item, index) => {
                      return (
                        <div className="teaching-option-item" key={index}>
                          {item.ClassName}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="teaching-info--item">
                  <div className="title-item">Hình thức giảng dạy</div>
                  <div className="teaching-option-list">
                    {infoTutor?.TutorTeachingForms.map((item, index) => {
                      return (
                        <div className="teaching-option-item" key={index}>
                          {item.TeachingFormName}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="teaching-info--item">
                  <div className="title-item">Bằng cấp</div>
                  <div className="teaching-option-list list-img">
                    {infoTutor?.TutorDegrees.map((item, index) => {
                      return (
                        <div
                          className="teaching-option-img"
                          key={index}
                          onClick={() => handleOpenImageModal(event, index + 1, item.NameMedia || certificate)}
                        >
                          <img src={item.NameMedia || certificate} alt="" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="content-body--info-footer">
                <Button
                  className={isChosenTutor ? 'btn-chosen' : ''}
                  width={304}
                  onClick={() => handleOptionButtonClick()}
                  isBlur={isDeleteProfilePage() && !isPermitDelete}
                >
                  {renderOptionButton()}
                </Button>
              </div>
            </div>
          ) : (
            <div className="content-body--rate">
              <div className="rate-star">
                <h3>Đánh giá chất lượng gia sư của bạn</h3>
                <ListStar number={numberStar} isSmallStar={false} onClick={!isDisable ? setIndexStar : () => {}} />
              </div>
              <div className="rate-description">
                <div className="rate-description--title">Đánh giá chung</div>
                <TextArea
                  placeholder="Nhập đánh giá"
                  rows={10}
                  onChange={(e: any) => setReviewContent(e.target.value)}
                  disabled={isDisable}
                  value={reviewContent}
                  maxLength={250}
                />
              </div>
              <div className="content-body--rate-footer">
                <Button
                  width={304}
                  onClick={() => {
                    !isDisable && handleSubmitRate();
                  }}
                  isBlur={isDisable}
                >
                  Lưu đánh giá
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalAuthen
        isShow={isShowAuthenModal}
        setIsShow={setIsShowAuthenModal}
        title={'Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục sử dụng YOTUTOR'}
        buttonTittleLeft={ModalButtons.login}
        buttonTittleRight={ModalButtons.register}
        onRightClick={() => {
          history('/profile-general/register');
        }}
        onLeftClick={() => {
          history('/login');
        }}
      />

      <ModalConfirm
        isShow={isShowExitConfirmModal}
        onClose={() => {
          setIsShowExitConfirmModal(false);
        }}
        text="Bạn chưa hoàn tất đánh giá. Bạn có chắc chắn muốn thoát không?"
      />

      <ModalConfirm
        isShow={isShowContinueRateModal}
        text="Bạn chưa hoàn tất đánh giá."
        text2="Vui lòng tiếp tục đánh giá."
        isRateConfirm={true}
        isReturnConfirm={false}
        onClose={() => {
          setIsShowContinueRateModal(false);
        }}
        onlyAgree={true}
        handleSave={() => setIsShowContinueRateModal(false)}
      />

      <ModalConfirm
        isShow={isShowRateModal}
        text="Bạn có muốn gửi đánh giá này?"
        isRateConfirm={true}
        isReturnConfirm={false}
        onClose={() => {
          setIsShowRateModal(false);
        }}
        handleSave={() => handleSaveRate(event)}
      />

      <ModalSuccess
        isShow={isShowSuccessRegisterModal}
        setIsShow={setIsShowSuccessRegisterModal}
        text="Lời mời dạy của bạn đã được gửi thành công. YOTUTOR sẽ xem và phản hồi bạn sớm nhất nhé!"
        clickOutside={() => handleReturnAfterRegister()}
      />

      <ModalSuccess
        isShow={isShowSuccessRateModal}
        setIsShow={setIsShowSuccessRateModal}
        text="Đánh giá thành công."
        text2="Cám ơn bạn đã gửi đánh giá."
      />

      <ModalConfirm
        isShow={isShowDeleteConfirmModal}
        text="Bạn có chắc chắn muốn xóa hồ sơ này không?"
        isReturnConfirm={false}
        onClose={() => {
          setIsShowDeleteConfirmModal(false);
        }}
        handleSave={() => handleDeleteProfile(event)}
      />

      <ModalSuccess
        isShow={isShowSuccessDeleteProfileModal}
        setIsShow={setIsShowSuccessDeleteProfileModal}
        text="Đã xóa hồ sơ thành công"
        clickOutside={() => history('/tutor/your-profiles')}
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

      <ModalImage
        isShow={isShowImageModal}
        setIsShow={setIsShowImageModal}
        onClose={() => setIsShowImageModal(false)}
        indexImage={indexImage}
        quantityImages={infoTutor?.TutorDegrees.length}
        srcImage={srcImage}
      />
    </div>
  );
};

export default TutorDetailsInfo;
