import { objToQuery } from '../../utils';
import axiosTutorToken from './axiosTutorToken';

export const apiReviewTutor = {
    createReviewTutor: (param: IParamCreateReviewTutor) => {
        const url = "review-tutor/create-review-tutor";
        return axiosTutorToken.post(url, param);
     },
    getReviewTutor: (param: {PostTutorId: number}) => {
    const url = "review-tutor/get-review-tutor" + objToQuery(param);
    return axiosTutorToken.get(url);
    },
}