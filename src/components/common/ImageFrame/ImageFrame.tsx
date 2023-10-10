import React, { StyleHTMLAttributes, useEffect, useState } from 'react';
import './ImageFrame.scss';
import { LIMIT } from '../../../constants';
import SvgCammera from '../../../assets/svg/SvgCammera';
import { SliderFile } from '../SliderFile/SliderFile';

interface IImageFrame {
  image: File | File[] | string | string[];
  setImage: (img: any) => void;
  width?: number;
  height?: number;
  ratio?: number;
  isMultiple?: boolean;
  placeholder?: string;
}

const getTypeArray = (array: string[] | File[]) => {
  if (array.length) return typeof array[0];
  else return undefined;
};

export const ImageFrame: React.FC<IImageFrame> = ({
  image,
  setImage,
  width,
  height,
  ratio = 1,
  isMultiple,
  placeholder,
}) => {
  const [previewImage, setPreviewImage] = useState<any>('');
  const [isVerticalImage, setIsVerticalImage] = useState(false);

  const styleImage = {
    width: width,
    height: height,
    aspectRatio: ratio,
  };

  useEffect(() => {
    if (image && typeof image === 'string') setPreviewImage(image);
    else if (Array.isArray(image)) {
      const imgList = [...image].map(item => {
        if (typeof item !== 'string') return URL.createObjectURL(item);
        else return item;
      });
      setPreviewImage(imgList);
    } else if (image && typeof image !== 'string') setPreviewImage(URL.createObjectURL(image));
  }, [image]);

  const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    if (e.target.files.length === 1) {
      if (e.target.files[0]?.size > LIMIT.IMAGE_SIZE) {
        alert('Vui lòng chọn ảnh có kích thước tối đa 10MB!');
        return;
      }
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      const data = [];
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i]?.size > LIMIT.IMAGE_SIZE) {
          alert('Vui lòng chọn ảnh có kích thước tối đa 10MB!');
          return;
        }
        data.push(e.target.files[i]);
      }
      setPreviewImage(data.map((item: any) => URL.createObjectURL(item)));
      setImage(data);
    }
  };

  return (
    <div style={styleImage} className="image-frame">
      {previewImage && typeof previewImage === 'string' && <img className="image-frame__img" src={previewImage} />}
      {isMultiple && Array.isArray(previewImage) && previewImage.length ? (
        <SliderFile
          listItem={previewImage}
          multiple={true}
          onChange={(newArr: any) => {
            if (newArr?.length > 10) {
              alert('Chỉ được chọn tối đa 10 file cho mỗi loại');
            } else {
              setImage(newArr);
              setPreviewImage(newArr?.map((item: any) => URL.createObjectURL(item)));
            }
          }}
        />
      ) : (
        <div className="image-frame__input">
          <div className="image-frame__input__wrap">
            <input type="file" accept="image/*" onChange={handleOnChangeImage} multiple={isMultiple ? true : false} />
            <div className="image-frame__input__wrap__icon">
              <SvgCammera width={36} height={36} />
            </div>
          </div>
          <p className="image-frame__input__label">{placeholder || 'Tải ảnh lên'}</p>
        </div>
      )}
    </div>
  );
};
