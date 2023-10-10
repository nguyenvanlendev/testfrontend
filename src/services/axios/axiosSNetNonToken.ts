import axios, { AxiosError, AxiosResponse } from 'axios';
import { createHeaderAPINonToken, responseAPI, responseErrorAPI } from './axiosBase';

const baseURL = process.env.URL_SNET_API || '';
const axiosSNETNoToken = axios.create(createHeaderAPINonToken(baseURL));

axiosSNETNoToken.interceptors.response.use(
  (res: AxiosResponse) => responseAPI(res),
  (error: AxiosError) => responseErrorAPI(error),
);

export default axiosSNETNoToken;