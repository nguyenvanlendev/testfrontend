import axiosTutorToken from './axiosTutorToken';
import { objToQuery } from '../../helpers/api';

export const apiPost = {
  createPost: (param: IParamCreatePost) => {
    const url = 'post/create-post';
    return axiosTutorToken.post(url, param);
  },
  getMyListPost: (param: IParamGetMyListPost) => {
    const url = 'post/get-my-list-post';
    return axiosTutorToken.post(url, param);
  },
  getInfoPost: (param: { PostId: string }) => {
    const url = 'post/get-info-post' + objToQuery(param);
    return axiosTutorToken.get(url);
  },
  updatePost: (param: IParamUpdatePost) => {
    const url = 'post/update-post';
    return axiosTutorToken.post(url, param);
  },
  openPost: (param: { PostId: string | number }) => {
    const url = 'post/open-post';
    return axiosTutorToken.post(url, param);
  },
  closePost: (param: { PostId: string | number }) => {
    const url = 'post/close-post';
    return axiosTutorToken.post(url, param);
  },
  getListPost: (param: IParamGetListPost) => {
    const url = 'post/get-list-post';
    return axiosTutorToken.post(url, param);
  },
};
