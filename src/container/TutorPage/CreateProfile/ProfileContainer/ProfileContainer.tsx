import React, { ReactNode } from 'react';
import { Button } from '../../../../components/common/Button/Button';
import { HeaderTitleMobile } from '../../../../components/common/HeaderTitleMobile/HeaderTitleMobile';
import './ProfileContainer.scss';

interface IProfileContainer {
  step: number;
  setStep: (func: (pre: number) => number | number) => void;
  handlePassStep: () => boolean;
  handleBack?: () => void;
  mode: 'CREATE' | 'EDIT';
  children: ReactNode;
  isLoading?: boolean;
}

export const ProfileContainer: React.FC<IProfileContainer> = ({
  step,
  setStep,
  handlePassStep,
  handleBack,
  mode,
  children,
  isLoading,
}) => {
  const handleGo = (des: 'prev' | 'next') => {
    if (des === 'next') {
      if (isLoading) return;
      if (!handlePassStep()) return;
      if (step === 3) return;
      setStep(pre => pre + 1);
    } else if (des === 'prev') {
      if (step === 1) return;
      if (handleBack) handleBack();
      setStep(pre => pre - 1);
    }
  };

  const ProcessBar = () => (
    <div className="profile-container__process">
      {[1, 2, 3].map(item => (
        <div key={item} className={`profile-container__process__item ${step >= item ? 'active' : ''}`} />
      ))}
    </div>
  );

  return (
    <div className="profile-container">
      <HeaderTitleMobile title={mode === 'CREATE' ? 'Tạo hồ sơ gia sư' : 'Chỉnh sửa hồ sơ'} />
      <ProcessBar />
      {children}
      <div className="profile-container__btns">
        {step === 1 ? (
          <Button className="profile-container__btns__continue single" onClick={() => handleGo('next')}>
            Tiếp theo
          </Button>
        ) : (
          <>
            <Button className="profile-container__btns__back" onClick={() => handleGo('prev')}>
              Quay lại
            </Button>
            <Button className="profile-container__btns__continue" onClick={() => handleGo('next')}>
              Tiếp theo
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
