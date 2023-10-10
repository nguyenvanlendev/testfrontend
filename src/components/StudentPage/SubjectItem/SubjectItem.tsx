import "./SubjectItem.scss";
import React from "react";
export const SubjectItem: React.FC<SubjectItem> = ({
    SubjectId,SubjectName,NumTutor,onClick
}) => {
    return <div className="subject-item" onClick = {() => {
        onClick(SubjectId)
    }}>
        <p>{SubjectName}</p>
        <p>{'( ' + NumTutor + ' gia sư' +' )'}</p>
    </div>
}
