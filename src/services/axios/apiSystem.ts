import axiosTutorNoToken from './axiosTutorNontoken';
interface ParamSystem {
  SearchText?: string;
  Limit?: 0;
  CurrentPage?: 0;
}
export const apiSystem = {
    getSubjectSelection: (param: ParamSystem) => {
        const url = "system/get-subject-selection";
        return axiosTutorNoToken.post(url, param)
    },
    getClasssSelection: (param: ParamSystem) => {
        const url = "system/get-class-selection";
        return axiosTutorNoToken.post(url, param)
    },
    getTeachingFormSelection: (param: ParamSystem) => {
        const url = "system/get-teaching-form-selection";
        return axiosTutorNoToken.post(url, param)
    },
    getAreaSelection: (param: ParamSystem) => {
        const url = "system/get-area-selection";
        return axiosTutorNoToken.post(url, param)
    },
    getAcademicLevelsSelection: (param: ParamSystem) => {
        const url = "system/get-academic-levels-selection";
        return axiosTutorNoToken.post(url, param)
    }
};
