
const NotificationItem = ({avatar,description,datetime,isSeen,onClick}:any) => {
    return (
        <div className={`notification-item ${isSeen ? '' : 'unseen'}`} onClick = {onClick}>
            <img src={avatar} alt="" className="notification-item__avatar" />
            <div className="notification-item__content">
                <p className="short-description">{description}</p>
                <p className="datetime">{datetime}</p>
            </div>
        </div>
    );
};

export default NotificationItem;