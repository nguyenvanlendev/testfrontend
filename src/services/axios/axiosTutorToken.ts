import axios from "axios";
import { readCookie } from "../../utils";
import { ETokenName } from "../../constants";

export const axiosTutorToken = {
    post: (url: string, param?: any) => {
        let config = {
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
                Authorization:readCookie(ETokenName.TUTOR_ACCESS_KEY) || "",
                channel: 'WEB',
                component: 'yotutor',
            },
        };
        return axios.post(process.env.URL_YOTUTOR_API + 'api/' + url, param, config);
    },
    get: (url: string) => {
        let config = {
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
                Authorization: readCookie(ETokenName.TUTOR_ACCESS_KEY) || "",
                channel: 'WEB',
                component: 'yotutor',
            },
        };
        return axios.get(process.env.URL_YOTUTOR_API + 'api/' + url, config);
    }
}

export default axiosTutorToken;
