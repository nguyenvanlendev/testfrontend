import React from 'react';
import { Modal } from '../../../../components/common/Modal/Modal';
import './ModalSuccess.scss';

const ModalSuccess: React.FC<IModal> = ({ isShow, setIsShow, clickOutside}) => {
  return (
    <Modal isShow={isShow} setIsShow={setIsShow} clickOutside={clickOutside}>
      <div className="modal-success">
        <p>Bạn đã tạo mới mật khẩu thành công. Vui lòng đăng nhập lại để tiếp tục sử dụng YOTUTOR.</p>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
