import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUserInfo } from '../../../services/axios/apiUserInfo';
import { AxiosResponse } from 'axios';
import { UserInfo } from '../../../@types/apiResponse';


export const doGetCurrentUser = createAsyncThunk('user@get/currentUser', async () => {
    const result: AxiosResponse = await apiUserInfo.getUserInfo();
    return result.data;
});



const initialState = {
 isLoading: false,
 dataUser: {} as UserInfo,
 error: {}
};

const slice = createSlice({
  name: 'user@',
  initialState: initialState,
  reducers: {
    
    doUpdateUser(state, action) {
      state.dataUser = action.payload;
    },
    
  },
  extraReducers: builder => {
    builder.addCase(doGetCurrentUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(doGetCurrentUser.fulfilled, (state, action) => {
      state.dataUser = action.payload.Content.User;
      state.isLoading = false;
    });
    builder.addCase(doGetCurrentUser.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});
const { reducer: currentUserReducer, actions } = slice;


export const { doUpdateUser } = actions;
export default currentUserReducer;
