import React from 'react';
import { Modal } from '../Modal/Modal';
import './ModalInform.scss';
import notifiIcon from '../../../assets/img/draft/confirm-modal-icon.png';
import { Button } from '../Button/Button';
import { CloseModal } from '../../../assets/svg/CloseModal';

const ModalInform: React.FC<any> = ({ isShow, setIsShow, text, onClose }) => {
  return (
    <Modal isShow={isShow} setIsShow={setIsShow} offClickOutside={true}>
      <div className="modal-inform-layout">
        <div className="close-icon" onClick={onClose}>
          <CloseModal />
        </div>
        <img src={notifiIcon} alt="inform-icon" />
        <p>{text}</p>
        <div className="modal-confirm-footer">
          <Button children={'Đồng ý'} className="btn-agree" onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalInform;
