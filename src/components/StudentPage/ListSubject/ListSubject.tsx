import React from 'react';
import { SubjectItem } from '../SubjectItem/SubjectItem';
import "./ListSubject.scss"
export const ListSubject: React.FC<ListSubject> = ({ listSubject,onClick }) => {

  const renderListSubject = (listSubject: ListSubject) => {
    return listSubject.map((item: SubjectItem, index: number) => {
        return <SubjectItem SubjectId={item.SubjectId} NumTutor = {item.NumTutor} key = {index + item.SubjectName} SubjectName={item.SubjectName} onClick = {onClick}/>
    });
  };



  return <div className="list-subject">{
    renderListSubject(listSubject)
  }</div>;
};
