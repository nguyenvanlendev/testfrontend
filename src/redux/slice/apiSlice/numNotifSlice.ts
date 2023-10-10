import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiNotify } from '../../../services/axios/apiNotify';
import { AxiosResponse } from 'axios';

export const doGetNumNoti = createAsyncThunk(
  'user@get/numNoti',
  async () => {
    const result: AxiosResponse = await apiNotify.GetNumNewNoti();
    return result.data;
  },
);

const initialState = {
  isLoading: false,
  numNoti: 0,
  error: {},
};

const slice = createSlice({
  name: 'noti@',
  initialState: initialState,
  reducers: {
    doUpdateNumNoti(state) {
      state.numNoti = state.numNoti + 1;
    },
    doClearNumNoti(state) {
      state.numNoti = 0;
    }
   
  },
  extraReducers: builder => {
    
    builder.addCase(doGetNumNoti.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(doGetNumNoti.fulfilled, (state, action) => {
      state.numNoti = action.payload.Content.Num;
      state.isLoading = false;
    });
    builder.addCase(doGetNumNoti.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
   
  },
});
const { reducer: numNotiReducer, actions } = slice;


export const { doUpdateNumNoti,doClearNumNoti } = actions;
export default numNotiReducer;
