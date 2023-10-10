import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import "./ModalConfirm.scss"
import confirmModalIcon from "../../../assets/img/draft/confirm-modal-icon.png"
import starModalIcon from "../../../assets/img/draft/starModalIcon.png"
import { Button } from '../Button/Button';
import { CloseModal } from '../../../assets/svg/CloseModal';
import { useNavigate } from 'react-router';

const ModalConfirm: React.FC<any> = ({
  isShow,
  setIsShow,
  text,
  text2,
  isHighlightText = false,
  onClose,
  onlyAgree = false,
  isReturnConfirm = true,
  isRateConfirm = false,
  navigateTo = -1,
  handleSave = () => {},
  textRightButton = 'Đồng ý'
}) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(navigateTo);
  };

  return (
    <>
      <Modal isShow={isShow} setIsShow={setIsShow} text={text}>
        <div className="modal-confirm-layout">
          <div className="close-icon" onClick={onClose}>
            <CloseModal />
          </div>
          <img src={isRateConfirm ? starModalIcon : confirmModalIcon} alt="confirm-icon" />
          <p>{text}</p>
          <p style={{ color: isHighlightText && 'red', marginTop: '5px' }}>{text2}</p>
          <div className="modal-confirm-footer">
            {!onlyAgree && <Button children={'Hủy'} className="btn-cancel" onClick={onClose} />}
            <Button
              children={textRightButton}
              className="btn-agree"
              onClick={() => {
                onClose();
                if (isReturnConfirm) {
                  handleReturn();
                } else {
                  handleSave();
                }
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalConfirm;