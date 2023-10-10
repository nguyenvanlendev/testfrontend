import axiosTutorNoToken from './axiosTutorNontoken';
import axiosTutorToken from './axiosTutorToken';
import { objToQuery } from '../../helpers/api';
export const apiLogin = {
  resgister: (data: any) => {
    const url = 'login/register-user';
    return axiosTutorNoToken.post(url, data);
  },
  login: (data: { Phone: string; Password: string }) => {
    const url = 'login/login-user';
    return axiosTutorNoToken.post(url, data);
  },
  checkPhoneUserExt: (param: { phone: string }) => {
    const url = '/login/check-phone-user-exist' + objToQuery(param);
    return axiosTutorNoToken.get(url);
  },
  forgotPassword: (data: { Phone: string; Otp: string; Password: string }) => {
    const url = 'login/forgot-password-user';
    return axiosTutorNoToken.post(url, data);
  },
  updateUser: (data:any) => {
    const url = 'users/update-user';
    return axiosTutorToken.post(url, data)
  }
};
