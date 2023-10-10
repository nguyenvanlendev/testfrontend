import axiosSNETNoToken from "./axiosSNetNonToken";
import axiosTutorNoToken from "./axiosTutorNontoken";

export const apiOTP = {
    sendOTP: (data:DataSendOTP) => {
        const url = "Login/SendOTP";
        return axiosSNETNoToken.post(url, data)
    },
    checkOTP: (data: DataCheckOTP) => {
        const url = "login/check-otp";
        return axiosTutorNoToken.post(url,data)
    },
    checkOTPForgotPassword: (data: DataCheckOTP) => {
        const url = "login/check-forgot-password-otp";
        return axiosTutorNoToken.post(url,data)
    },
}