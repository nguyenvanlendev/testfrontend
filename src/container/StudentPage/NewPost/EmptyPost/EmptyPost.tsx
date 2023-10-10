import React from 'react'
import './EmptyPost.scss'
import emptyPhoto from '../../../../assets/img/draft/EmptyNotification.png'
import { Button } from '../../../../components/common/Button/Button'
import { useNavigate } from 'react-router-dom'

export default function EmptyPost() {
  const navigate = useNavigate()
  return (
    <div className="empty-post">
        <h3>Bạn chưa có tin đăng nào, tạo ngay!</h3>
        <img src={emptyPhoto} alt="Empty Photo" />
        <button onClick={()=>navigate('/student/post-find-tutor/post')}>Tạo tin ngay</button>
    </div>
  )
}
