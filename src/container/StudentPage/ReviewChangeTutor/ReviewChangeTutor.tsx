import React, { useEffect, useState } from 'react';
import { HeaderTitleMobile } from '../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import { ListStar } from '../../../components/StudentPage/ListStar/ListStar';
import TextArea from '../../../components/common/TextArea/TextArea';
import './ReviewChangeTutor.scss';
import { Button } from '../../../components/common/Button/Button';
import ModalConfirm from '../../../components/common/ModalConfirm/ModalConfirm';
import ModalSuccess from '../../../components/common/ModalSuccess/ModalSuccess';
import { apiReviewTutor } from '../../../services/axios/apiReviewTutor';
import { useNavigate } from 'react-router-dom';
import { apiPostTutor } from '../../../services/axios/apiPostTutor';

const ReviewChangeTutor = () => {
  const history = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString); 
  const posttutorid = urlParams.get('posttutorid')
  const postid = urlParams.get('postid')

  const [numberStar, setNumberStar] = useState<number>(0);
  const [indexStar, setIndexStar] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>('');

  const [isShowRateModal, setIsShowRateModal] = useState<boolean>(false);
  const [isShowContinueRateModal, setIsShowContinueRateModal] = useState<boolean>(false);
  const [isShowSuccessRateModal, setIsShowSuccessRateModal] = useState<boolean>(false);

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
        PostTutorId: posttutorid!,
        Rating: indexStar,
        Content: reviewContent,
        //điều kiện tạo đánh giá thay đổi gia sư 
        TypeReviewId: 20,
        StatusProcessId: 90,
      })
      .then(res => {
        setIsShowSuccessRateModal(true);
      });
  };

  return (
    <div className="review-change-tutor">
      <HeaderTitleMobile
        title="Gửi đánh giá"
        onClick={() => history(-1)}
      />
      <div className="review-change-tutor__body">
        <h3>Vui lòng đánh giá gia sư của bạn trước khi chọn gia sư mới.</h3>
        <div className="review-change-tutor__rate-star">
          <h3>Đánh giá chất lượng gia sư của bạn</h3>
          <ListStar number={numberStar} isSmallStar={false} onClick={setIndexStar} />
        </div>
        <div className="review-change-tutor__rate-description">
          <div className="review-change-tutor__rate-description--title">Đánh giá chung</div>
          <TextArea
            placeholder="Nhập đánh giá"
            rows={10}
            onChange={(e: any) => setReviewContent(e.target.value)}
            value={reviewContent}
            maxLength={250}
          />
        </div>
        <div className="review-change-tutor__footer">
          <Button
            className="btn-cancel"
            onClick={() => {
              history(-1);
            }}
            isBlur={true}
          >
            Bỏ qua
          </Button>
          <Button
            onClick={() => {
              handleSubmitRate();
            }}
          >
            Đánh giá
          </Button>
        </div>
      </div>

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
        isShow={isShowSuccessRateModal}
        setIsShow={setIsShowSuccessRateModal}
        text="Đánh giá thành công."
        text2="Cám ơn bạn đã gửi đánh giá."
        clickOutside={() => history('/student/new-post')}
      />
    </div>
  );
};

export default ReviewChangeTutor;
