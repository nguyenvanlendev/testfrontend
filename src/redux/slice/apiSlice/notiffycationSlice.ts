import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiNotify } from '../../../services/axios/apiNotify';
import { AxiosResponse } from 'axios';

export const doGetListNoti = createAsyncThunk(
  'user@get/listNoti',
  async (param: { CurrentPage: number; CurrentDate: string; Limit: number }) => {
    const result: AxiosResponse = await apiNotify.GetListNotifycation(param);
    return result.data;
  },
);



const initialState = {
  isLoading: false,
  listNoti: [] as INotiItem[],
  error: {},
};

const slice = createSlice({
  name: 'noti@',
  initialState: initialState,
  reducers: {

   doUpdateListNoti(state, action) {
    state.listNoti = [action.payload,...state.listNoti.filter((item) => {
      return item.NotificationId !== action.payload.NotificationId
    })]
   },

   doGetMoreNoti(state, action) {
    state.listNoti = [...state.listNoti,...action.payload]
   },
   
   doClearListnoti(state) {
    state.listNoti = []
   }
  },
  extraReducers: builder => {
    builder.addCase(doGetListNoti.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(doGetListNoti.fulfilled, (state, action) => {
      state.listNoti = action.payload.Content.Notifications;
      state.isLoading = false;
    });
    builder.addCase(doGetListNoti.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

   
   
  },
});
const { reducer: listNotiReducer, actions } = slice;
export const { doGetMoreNoti, doUpdateListNoti, doClearListnoti } = actions;
export default listNotiReducer;
