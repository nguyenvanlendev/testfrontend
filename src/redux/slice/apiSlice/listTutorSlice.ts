import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiTutor } from '../../../services/axios/apiTutor';
import { AxiosResponse } from 'axios';

export const doGetListTutor = createAsyncThunk('user@get/listTutor', async (param: IParamCreateGetListTutor) => {
  const result: AxiosResponse = await apiTutor.getListTutor(param);
  return result.data;
});


const initialState = {
  isLoading: false,
  listTutor: [] as ITutor[],
  
  error: {},
};

const slice = createSlice({
  name: 'tutor@',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(doGetListTutor.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(doGetListTutor.fulfilled, (state, action) => {
      state.listTutor = action.payload.Content.Tutors;
      state.isLoading = false;
    });
    builder.addCase(doGetListTutor.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});
const { reducer: getListTutorReducer, actions } = slice;

//export const { doUpdateUser } = actions;
export default getListTutorReducer;
