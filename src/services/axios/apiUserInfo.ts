import axiosTutorToken from "./axiosTutorToken";

export const apiUserInfo = {
    getUserInfo: () => {
        const url = "users/get-info-user";
        return axiosTutorToken.get(url)
    }, 
}