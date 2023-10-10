import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiTutor } from '../../../services/axios/apiTutor';
import { AxiosResponse } from 'axios';
import { ParamUserRegisterPost, apiPostTutor } from '../../../services/axios/apiPostTutor';

interface IState {
  isLoading: boolean;
  tutorProfiles: ITutor[];
  error: {};
}

export const doPostRegisterPost = createAsyncThunk(
  'postTutor@post/totorRegisterPost',
  async (param: ParamUserRegisterPost) => {
    const result: AxiosResponse = await apiPostTutor.tutorRegisterPost(param);
    return result.data;
  },
);
// export const doPostChoosePost = createAsyncThunk(
//   'postTutor@post/tutorChoosePost',
//   async (param: IParamGetMyListPost) => {
//     const result: AxiosResponse = await apiPostTutor.tutorChoosePost(param);
//     return result.data;
//   },
// );

const initialState: IState = {
  isLoading: false,
  tutorProfiles: [],
  error: {},
};

const slice = createSlice({
  name: 'postTutor@',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(doPostRegisterPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doPostRegisterPost.fulfilled, (state, action) => {
      state.tutorProfiles = action.payload.Content.Tutors;
      state.isLoading = false;
    });
    builder.addCase(doPostRegisterPost.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
const { reducer: getTutorProfiles, actions } = slice;

export default getTutorProfiles;
