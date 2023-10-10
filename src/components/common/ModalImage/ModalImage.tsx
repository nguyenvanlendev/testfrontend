import React from 'react';
import { Modal } from '../Modal/Modal';
import './ModalImage.scss';
import { XIcon } from '../../../assets/svg/XIcon';

const ModalImage: React.FC<any> = ({ isShow, setIsShow, onClose, srcImage, indexImage, quantityImages }) => {
  return (
    <Modal isShow={isShow} setIsShow={setIsShow}>
      <div className="modal-image-layout">
        <div className="modal-image-layout__header-wrapper">
          <p className="index-img">{indexImage}/{quantityImages}</p>
          <div className="close-icon" onClick={onClose}><XIcon/></div>
        </div>
        <img
          src={srcImage}
          alt=""
        />
      </div>
    </Modal>
  );
};

export default ModalImage;
