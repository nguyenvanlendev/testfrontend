import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import { Button } from '../Button/Button';

const defaultRangeBackground = {
  unit: 'px',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  aspect: 1 / 1,
};

interface ICropImage {
  previewImage: string;
  setResult: (data: string) => void;
  setFile: (data: any) => void;
  fileName: string | undefined;
  isEditImage?: boolean;
  setIsEditImage?: (data: boolean) => void;
}

const CropImage = ({ previewImage, setFile, fileName, setResult, setIsEditImage, isEditImage }: ICropImage) => {
  const [image, setImage] = useState<any>();
  const [crop, setCrop] = useState<any>(defaultRangeBackground);

  const getCroppedImg = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    try {
      // Convert the canvas element to a file
      const base64Image = canvas.toDataURL('image/jpeg');

      const cropFileName = fileName ? fileName : 'cropped-image.jpg';
      canvas.toBlob(
        (blob: any) => {
          const file = new File([blob], cropFileName, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          setFile(file);
        },
        'image/jpeg',
        1,
      );
      setResult(base64Image);
    } catch (Error) {
      console.log('Have an error when converse image into file.', Error);
    }
  };

  const handleCropImage = (data: 'cancel' | 'update') => {
    if (data === 'cancel') {
      setIsEditImage && isEditImage && setIsEditImage(!isEditImage);
    } else {
      getCroppedImg();
      setIsEditImage && isEditImage && setIsEditImage(!isEditImage);
    }
  };
  const handleSetImage = (target:HTMLImageElement) => {
    // set CORS for doman of S3 with domain of Yoot
    target.setAttribute("crossorigin","anonymous")
    setImage(target)
  }
  return (
    <>
      <div className="edit-edit-avatar__crop-main">
        <ReactCrop
          style={{ width: '100%' }}
          circularCrop={true}
          ruleOfThirds
          src={previewImage}
          onImageLoaded={(target: HTMLImageElement)=>handleSetImage(target)}
          crop={crop}
          onChange={setCrop}
        />
      </div>

      <div className="edit-avatar__crop-button">
        <Button type="button" className="edit-avatar__crop-button--left" onClick={() => handleCropImage('cancel')}>
          Hủy
        </Button>
        <Button type="button" className="edit-avatar__crop-button--right" onClick={() => handleCropImage('update')}>
          Xong
        </Button>
      </div>
    </>
  );
};

export default CropImage;
