import React from 'react';
import { useNavigate } from 'react-router';
import closeIcon from '../../../assets/img/draft/back-icon.png';
import "./PageHeader.scss"


const PageHeader = ({title, navigateTo = -1}:any) => {
    const navigate = useNavigate();

    const hanldeNavigate = () => {
        navigate(navigateTo)
    }
    return (
        <div className="page-header">
            <img src={closeIcon} alt="" className="back-icon"  onClick={() => hanldeNavigate()}/>
            <h3 className="page-header-title">{title}</h3>
        </div>
    );
};

export default PageHeader;