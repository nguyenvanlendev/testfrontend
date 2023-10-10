import React, { FC } from 'react';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import './LoaderModal.scss';

export const LoaderModal: FC<ILoaderModal> = ({ isShow }) => {
  return (
    <Modal className="loader-modal" isOpen={isShow}>
      <Loader />
    </Modal>
  );
};
