import { Modal } from '../Modal/Modal';
import './ModalAuthen.scss';
import confirmModalIcon from '../../../assets/img/draft/confirm-modal-icon.png';
import starModalIcon from '../../../assets/img/draft/starModalIcon.png';
import { Button } from '../Button/Button';
import { CloseModal } from '../../../assets/svg/CloseModal';
import { ModalButtons } from '../../../constants';
// import { useNavigate } from 'react-router-dom';
// import CloseModalIcon from '../../../assets/svg/CloseModalIcon';

interface IModalConfirm {
  isShow?: boolean;
  setIsShow?: (value: boolean) => void;
  onClose?: () => void;
  title?: string;
  buttonTittleLeft?: string;
  buttonTittleRight?: string;
  startImage?: boolean;
  onLeftClick?: any;
  onRightClick?: any
}

const ModalAuthen = ({
  isShow,
  setIsShow,
  title,
  buttonTittleLeft = ModalButtons.cancel,
  buttonTittleRight = ModalButtons.agree,
  startImage = false,
  onLeftClick,
  onRightClick,
}: IModalConfirm) => {

  const handleCloseModal = () => {
    isShow && setIsShow && setIsShow(!isShow);
  };
  
  return (
    <>
      <Modal isShow={isShow} className="modal-authen">
        <div className="modal-authen__layout">
          <div className="close-icon" onClick={() => handleCloseModal()}>
            <CloseModal />
          </div>
          <img src={startImage ? starModalIcon : confirmModalIcon} alt="confirm-icon" />
          <p>{title}</p>
          <div className="modal-authen__footer">
            <Button children={buttonTittleLeft} className="btn-left" onClick={() => onLeftClick()} />
            <Button children={buttonTittleRight} className="btn-right" onClick={() => onRightClick()} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAuthen;
