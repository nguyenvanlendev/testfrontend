import { deleteAllCookies, deteletAllCookie } from '.';
import { ETokenName } from '../constants';
import { setCookie } from './cookie';
import { readCookie } from './cookie';
import { apiUserInfo } from '../services/axios/apiUserInfo';
export const logout = () => {
  const domain = process.env.COOKIE_DOMAIN || window.location.hostname;
  localStorage.clear();
  deteletAllCookie(domain);
  deleteAllCookies();
  // window.location.replace(window.location.origin);
};

export const login = (content: any) => {
  const domain = process.env.COOKIE_DOMAIN;
  deleteAllCookies();
  const {
    Token
  } = content;
  window.localStorage.setItem(ETokenName.TUTOR_ACCESS_KEY, Token);
  setCookie(365, Token, ETokenName.TUTOR_ACCESS_KEY, domain);
};

export const checkIsLogined = async () => {
  const token =  readCookie(ETokenName.TUTOR_ACCESS_KEY);
  if(token) {
    let isLogged = false;
    await apiUserInfo.getUserInfo().then((res) => {
        isLogged = true;
    })
    .catch((error) => {
      if(error.response.status === 401){
        logout()
      }
      isLogged = false;
    })
    return isLogged;
  }
  return false;
}








