import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import closeIcon from '../../../assets/img/draft/back-icon.png';
import avatarDefault from '../../../assets/img/draft/editAvatarDefault.png';
import IconEditAvatar from '../../../assets/svg/IconEditAvatar';
import SvgCammera from '../../../assets/svg/SvgCammera';
import { Button } from '../Button/Button';
import CropImage from '../CropImage';

import './EditAvatar.scss';

const EditAvatar = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const fileInputRef = useRef<HTMLInputElement | any>();
  const [file, setFile] = useState<File>();
  const [result, setResult] = useState<any>(null);
  const [isEditImage, setIsEditImage] = useState<boolean>(false);
  const { type } = useParams();

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : state.avatar;
  }, [file]);

  const fileName = useMemo(() => {
    return file && file.name;
  }, [file]);

  const handleOnChangeLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile && imageFile.type.includes('image')) {
      setResult(null)
      setFile(imageFile);
    } 
  };

  const handleEditImage = () => {
    if (previewImage) {
      setIsEditImage(true);
    } else {
      setIsEditImage(false);
      fileInputRef.current.click();
    }
  };

  const handleUpdateImage = () => {
    setIsEditImage(false);
    fileInputRef.current.click();
  }

  const isFromUpdatePage = () => {
    if (type === 'update') {
      return true;
    } else {
      return false;
    }
  };

  const handleUpdateDataImage = () => {
    navigate(handleCurrentLink(), { state: { avatar: result ? result : previewImage, file: file } });
  };

  const handleCurrentLink = () => {
    // const currentLink = window.location.pathname;
    // const prevLink = currentLink.slice(0,-7)
    // return prevLink;
    if (isFromUpdatePage()) {
      return '/profile-general/update';
    } else {
      return '/profile-general/register';
    }
  };

  // const handdleSubmit = () => {
  //   const formdata = new FormData();
  //   formdata.append('aaa', ima)
  // }

  const renderPage = () => {
    if (!isEditImage) {
      return (
        <>
          <div className="edit-avatar__header">
            <img src={closeIcon} alt="Tạo mật khẩu mới" onClick={() => navigate(-1)} />
            <p>Thay đổi ảnh đại diện</p>
          </div>
          <input
            type="file"
            id={'avatar'}
            style={{ display: 'none' }}
            onChange={handleOnChangeLogo}
            ref={fileInputRef}
          />
          <div className="edit-avatar__main">
            <div className="edit-avatar__image">
              {result ? (
                <div
                  style={{
                    background: `url(${result}) center center / cover no-repeat`,
                    width: '100%',
                    borderRadius: '45px',
                  }}
                  className="edit-avatar__image--default"
                ></div>
              ) : (
                <div
                  style={{
                    background: `url(${previewImage ? previewImage : avatarDefault}) center center / cover no-repeat`,
                    width: '100%',
                    borderRadius: '45px',
                  }}
                  className="edit-avatar__image--default"
                ></div>
              )}
            </div>

            <div className="edit-avatar__change" >
              <div className="edit-avatar__change--edit" onClick={() => handleEditImage()}>
                <IconEditAvatar />
                <span>Chỉnh sửa ảnh</span>
              </div>
              <div className='dit-avatar__change--update' onClick={()=>handleUpdateImage()}>
                <SvgCammera width={40} height={40} />
              </div>
            </div>
          </div>

          <div className="edit-avatar__button">
            <Button type="button" className="register__button" onClick={() => handleUpdateDataImage()}>
              Cập nhật ảnh
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <CropImage
          previewImage={previewImage}
          setResult={setResult}
          setFile={setFile}
          isEditImage={isEditImage}
          setIsEditImage={setIsEditImage}
          fileName={fileName}
        />
      );
    }
  };

  return (
    <>
      <div className="edit-avatar">{renderPage()}</div>
    </>
  );
};

export default EditAvatar;
