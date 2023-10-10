import React from 'react';
import { Modal } from '../Modal/Modal';
import "./ModalSuccess.scss"
import SuccessIcon from "../../../assets/img/draft/success-icon.png"

const ModalSuccess: React.FC<any> = ({isShow, setIsShow, text, text2, clickOutside}) => {
    return (
        <Modal isShow={isShow} setIsShow={setIsShow} clickOutside = {clickOutside}>
            <div className="modal-success-layout">
                <img src={SuccessIcon} alt="success-icon" />
                <p>{text}</p>
                <p>{text2}</p>
            </div>
        </Modal>
    );
};

export default ModalSuccess;