import React from 'react';
import PageHeader from '../../common/PageHeader/PageHeader';
import avaDefault from '../../../assets/img/draft/avaDefault.png'
import "./ProfileInfoMobile.scss"
import { Button } from '../../common/Button/Button';
import { useNavigate } from 'react-router';
import { Avatar } from '../../common/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkIsLogined } from '../../../utils/auth';
import { doGetCurrentUser } from '../../../redux/slice/apiSlice/currentUserSlice';
import { RootState } from '../../../redux';



const ProfileInfoMobile = () => {
    const { dataUser } = useSelector((state:RootState) => {
        return state.currentUserReducer
    })
    const navigate = useNavigate();
    const dispatch  = useDispatch();

    useEffect(() => {
        checkIsLogined().then((res) => {
            if(res) dispatch(doGetCurrentUser());
        })
        .catch((err) => {
            console.log(err);
        })
    },[])


    return (
        <div className="profile-info-mobile">
            <PageHeader title="Thông tin cá nhân"/>
            <div className="profile-info-mobile__content">
                <div className="avatar-content">
                    <Avatar
                    width={'112px'}
                    height={'112px'}
                    borderRadius={45}
                    filter={'drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25))'}
                    image = {dataUser?.Avatar || avaDefault}
                    />
                    <h3 className="username">{dataUser?.FullName}</h3>
                </div>
                <div className="info-list">
                    <div className="info-item">
                        <p className="info-item__title">Số điện thoại</p>
                        <p className="info-item__text">{dataUser?.Phone}</p>
                    </div>
                    <div className="info-item">
                        <p className="info-item__title">Giới tính</p>
                        <p className="info-item__text">{dataUser?.GenderText}</p>
                    </div><div className="info-item">
                        <p className="info-item__title">Mật khẩu</p>
                        <p className="info-item__text">*********</p>
                    </div>
                </div> 
                <div className="btn-update-profile" >
                    <Button width={238} height={60} children={'Cập nhật thông tin'} onClick={()=> navigate('/profile-general/update')}/>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfoMobile;