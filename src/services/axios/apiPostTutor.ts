import { objToQuery } from '../../utils';
import axiosTutorToken from './axiosTutorToken';

export interface ParamUserRegisterPost {
  PostId: number | string | null;
  TutorId: number | string;
}

export interface ParamCheckChangeTutor {
  PostId: number;
}

export interface ParamUpdateStatusChangeTutor {
  PostTutorId: number | string;
  PostId: number | string;
}

export const apiPostTutor = {
  userRegisterPost: (param: ParamUserRegisterPost) => {
    const url  = "post-tutor/user-register-tutor";
    return axiosTutorToken.post(url, param)
  },
  tutorRegisterPost:(param:ParamUserRegisterPost)=>{
    const url  = "post-tutor/tutor-register-post";
    return axiosTutorToken.post(url, param)
  },
  tutorChoosePost:(param:ParamUserRegisterPost)=>{
    const url  = "post-tutor/tutor-choose-post";
    return axiosTutorToken.post(url, param)
  },
  tutorRemoveChoosePost:(param:ParamUserRegisterPost)=>{
    const url  = "post-tutor/tutor-remove-choose-post";
    return axiosTutorToken.post(url, param)
  },
  userChooseTutor:(param:ParamUserRegisterPost)=>{
    const url = "post-tutor/user-choose-tutor";
    return axiosTutorToken.post(url,param)
  },
  userRegisterTutor:(param:ParamUserRegisterPost)=>{
    const url = "post-tutor/user-register-tutor";
    return axiosTutorToken.post(url,param)
  },
  userRemoveChooseTutor:(param:ParamUserRegisterPost)=>{
    const url = "post-tutor/user-remove-choose-tutor";
    return axiosTutorToken.post(url,param)
  },
  // tutorRegisterPost:(param: {
  //   postid: number,
  //   tutorid: number
  // })=>{
  //   const url = "post-tutor/TutorRegisterPost";
  //   return axiosTutorToken.post(url,param)
  // }
  checkChangeTutor: (param: ParamCheckChangeTutor) => {
    const url = "post-tutor/check-change-tutor" + objToQuery(param);
    return axiosTutorToken.get(url)
  },
  updateStatusChangeTutor: (param: ParamUpdateStatusChangeTutor) => {
    const url = "post-tutor/update-status-change-tutor";
    return axiosTutorToken.post(url,param)
  },
};
