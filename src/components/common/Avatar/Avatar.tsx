import React from 'react';
import './Avatar.scss';
import avatarDefault from '../../../assets/img/draft/avaDefault.png';

export const Avatar: React.FC<IAvatar> = ({
  image = avatarDefault,
  className,
  height,
  width,
  borderRadius = '50%',
  marginRight,
  onClick,
  marginBottom,
  marginTop,
  filter
}) => {
  const handleImage = (inputImage:string) => {
    if (!inputImage) {
      inputImage = avatarDefault;
    }
    return inputImage;
  };
  
  return (
    <div
      className={`avatar ${className}`}
      style={{
        backgroundImage: `url(${handleImage(image)})`,
        width,
        height,
        borderRadius,
        marginRight,
        marginBottom,
        marginTop,
        filter, 
      }}
      onClick={onClick}
    />
  );
};
