import { AxiosError, AxiosResponse } from "axios";

export const createHeaderAPI = (baseurl: string, token: string) => ({
    baseURL: baseurl + 'api/',
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: token,
        channel: 'WEB',
        component: 'YOTUTOR',
    }
})

export const createHeaderAPINonToken = (baseurl: string) => ({
    baseURL: baseurl + 'api/',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      channel: 'WEB',
      component: 'YOTUITOR',
    },
  });

  export function responseAPI(res: AxiosResponse) {
    return res;
  }
  
  export function responseErrorAPI(error: AxiosError) {
    return error;
  }
  
       
       
