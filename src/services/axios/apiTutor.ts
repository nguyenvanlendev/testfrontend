import axiosSNETNoToken from './axiosSNetNonToken';
import { objToQuery } from '../../helpers/api';
import axiosTutorNoToken from './axiosTutorNontoken';
import axiosTutorToken from './axiosTutorToken';

export const apiTutor = {
  getListTutor: (param: IParamCreateGetListTutor) => {
    const url = "tutor/get-list-tutor";
    return axiosTutorToken.post(url, param)
  },
  getTutorProfiles: (param: IParamCreateGetListTutor) => {
    const url = 'tutor/get-list-tutor';
    return axiosTutorToken.post(url, param);
  },
  getListTutorFollowSubject: () => {
    const url = "tutor/get-list-tutor-follow-subject";
    return axiosTutorToken.post(url)
  },
  getInfoTutor: (param: any) => {
    const url = "tutor/get-info-tutor" + objToQuery(param);
    return axiosTutorToken.get(url)
  },
  getListTutorRecommend:(param: IParamCreateGetListTutor)=>{
    const url = "tutor/get-list-tutor-recommend";
    return axiosTutorToken.post(url,param)
  },
  getListRegisterTutor: (param: IParamCreateGetListTutor) => {
    const url = "tutor/get-list-tutor";
    return axiosTutorToken.post(url, param)
  },
  postOpenProfileTutor: (tutorId: number) => {
    const url = 'tutor/open-profile-tutor';
    return axiosTutorToken.post(url, { tutorId: tutorId });
  },
  postCloseProfileTutor: (tutorId: number) => {
    const url = 'tutor/close-profile-tutor';
    return axiosTutorToken.post(url, { tutorId: tutorId });
  },
  createTutor: (params: FormData) => {
    const url = 'tutor/create-tutor';
    return axiosTutorToken.post(url, params);
  }, 
  updateTutor: (params: FormData) => {
    const url = 'tutor/update-tutor';
    return axiosTutorToken.post(url, params);
  }, 
  getCheckPermissionDeleteTutor: (params: any) => {
    const url = "tutor/check-permission-delete-tutor" + objToQuery(params);
    return axiosTutorToken.get(url)
  },
  postDeleteProfileTutor: (tutorId: string) => {
    const url = 'tutor/delete-profile-tutor';
    return axiosTutorToken.post(url, { tutorId: tutorId });
  }
}
  

