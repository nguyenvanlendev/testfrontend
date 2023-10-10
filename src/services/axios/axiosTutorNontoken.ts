import axios, { AxiosError, AxiosResponse } from 'axios';
import { createHeaderAPINonToken, responseAPI, responseErrorAPI } from './axiosBase';

const baseURL = process.env.URL_YOTUTOR_API || '';

const axiosTutorNoToken = axios.create(createHeaderAPINonToken(baseURL));

axiosTutorNoToken.interceptors.response.use(
  (res: AxiosResponse) => responseAPI(res),
  (error: AxiosError) => responseErrorAPI(error),
);

export default axiosTutorNoToken;
