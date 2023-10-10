import React from 'react';
import { Modal } from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';
import './ModalChosenOlogy.scss';


export const ModalChosenOlogy: any = ({ children, isShow, setIsShow }:any) => {
  const history = useNavigate();
  return (
    <Modal isShow={isShow}>
      <div className='modal-chosen'>
          <p>Bạn chưa chọn ngành học.<br />Hãy chọn ngành học tham khảo nhé!</p>
          <div className='list-btn'>
            <button className='btn-no' onClick={(e)=> {
              e.stopPropagation()
              setIsShow(false);
            }}>Hủy</button>
            <button className='btn-yes' onClick = {(e) => {
              e.stopPropagation()
              setIsShow(false);
              history('/', {replace: true})
            }}>Chọn ngay</button>
          </div>
      </div>
    </Modal>
  );
};
