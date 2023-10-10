import React, { useState } from 'react';
const pdfImage = process.env.PATH_CDN_ASSET_CHANCE + 'general/' + 'images/pdf-image.png';
import { CameraIcon } from '../../../assets/svg';
import './SliderFile.scss';
export const SliderFile: React.FC<any> = ({ listItem, onChange, multiple }) => {
  const [data, setData] = useState<Array<any>>(listItem);

  //remove exact file
  const removeFile = async (item: any) => {
    const dataDeleted = [...data];
    await dataDeleted.splice(dataDeleted.indexOf(item), 1);
    await setData(dataDeleted);
    return onChange(dataDeleted);
  };

  // convert Kb to Mb
  const formatToMb = (value: number) => {
    const divValue = value / 1000;
    return Math.round(divValue);
  };

  const displayFileSize = (fileSize: number) => {
    //KB
    if (fileSize < 1024 * 1024) {
      return `${(fileSize / 1024).toFixed(2)} KB`;
    } else {
      return `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const generateURLImage = (item: any) => {
    if (typeof item?.lastModified === 'number' && item !== null) {
      return URL.createObjectURL(item);
    } else return item?.thumbnail;
  };

  const checkValidateFile = (item: any) => {
    if (
      item?.type !== 'application/pdf' &&
      item?.type !== 'image/png' &&
      item?.type !== 'image/jpeg' &&
      item?.type !== 'image/jpg'
    ) {
      return false;
    } else return true; // test
  };

  return (
    <div className="slider__file">
      <div className="slider__file-wrapper">
        {(!multiple && data?.length === 0) || multiple ? 
          <div className="slider__file-add-file" style={{ width: '114px', height: '114px' }}>
            <input
              type="file"
              className="slider__file-input"
              accept="image/jpeg,image/png,image/jpg,application/pdf"
              onChange={async (e: any) => {
                const dataAdded = [...data];
                //@ts-ignore
                if (dataAdded?.length < 10) {
                  await dataAdded.push(e.target.files[0]);
                  if (e.target.files[0].size > 10 * 1000 * 1000) {
                    alert('Dung lượng mỗi file không được quá 10MB');
                  } else if (!checkValidateFile(e.target.files[0])) {
                    alert('Chỉ được tải lên tệp hình ảnh hoặc pdf');
                  } else {
                    await setData(dataAdded);
                    return onChange(dataAdded);
                  }
                } else {
                  alert('Chỉ được chọn tối đa 10 file cho mỗi loại');
                }
              }}
            />
            <CameraIcon />
            <p className="slider__file-item-text">Tải file lên</p>
          </div>
        : ''}
        {data?.length > 0 &&
          data?.map((item: any, index: any) => {
            return (
              <div className="slider__file-item" key={index}>
                <div className="slider__file-icon delete-item" onClick={() => removeFile(item)}>
                  X
                </div>
                {item?.name?.match(/.pdf$/i) ? (
                  <div className="slider__file-item item-pdf">
                    <div className="slider__file-size">
                      {displayFileSize(item.size ?? item.filesize)}
                    </div>
                    <div className="slider__file-name">{item.filename ?? item.name}</div>
                    <img src={pdfImage} alt="" />
                  </div>
                ) : (
                  <div className="slider__file-item item-image">
                    <img
                      src={typeof item === 'string' ? item : generateURLImage(item)}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
