import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { PostActionType } from '../../../constants/tutorPost';
import { apiPost } from '../../../services/axios/apiPost';

// Type for addMatcher
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

// export interface IPostTeachingFroms {
//   Id?: number;
//   Title?: string;
//   PostId?: number;
// }
// interface IPostAreas {
//   Id?: number;
//   Title?: string;
//   PostId?: number;
// }
// interface ISessionDays {
//   SessionDayId?: number;
//   SessionDayText?: string;
// }
// export interface IPostSessiOnWeeks {
//   PostId?: number;
//   SessionDayId?: number;
//   SessionDays?: ISessionDays[];
//   sessiondaytext?: string;
//   WeekdayId?: number;
//   WeekdayText?: string;
// }

// export interface IPost {
//   ClassId?: number;
//   ClassSearchText?: string;
//   ClassText?: string;
//   FullName?: string;
//   Id?: number;
//   IsChooseFinal?: number;
//   IsOpen?: number;
//   NamePost?: any;
//   NextFeeDate?:any;
//   NumClassId?: number;
//   NumSubject?: number;
//   PostAreas?: IPostAreas[];
//   PostDate?: string;
//   PostSessionWeeks?: IPostSessiOnWeeks[];
//   PostTeachingForms?: IPostTeachingFroms[];
//   StartDate?: string;
//   SubjectId?: number;
//   SubjectSearchText?: string;
//   SubjectText?: string;
//   UserId?: number;

  
// }

interface IInitState {
  loading: boolean;
  posts: IPost[];
  matchingPosts: IPost[];
  registerPosts: IPost[];
  currentRequestId: undefined | string;
}

export const doGetMyListPost = createAsyncThunk('Posts@get/getMyListPost', async (param: IParamGetMyListPost) => {
  const result: AxiosResponse = await apiPost.getMyListPost(param);
  return result.data;
});

export const doGetMyListMatchingPost = createAsyncThunk(
  'Posts@get/getMyListMatchingPost',
  async (param: IParamGetMyListPost) => {
    if (param.Action === PostActionType.MatchingPost) {
      const result: AxiosResponse = await apiPost.getMyListPost(param);
      return result.data;
    }
  },
);

export const doGetMyListRegisterPost = createAsyncThunk(
  'Posts@get/getMyListRegisterPost',
  async (param: IParamGetMyListPost) => {
    if (param.Action === PostActionType.RegisterPost) {
      const result: AxiosResponse = await apiPost.getMyListPost(param);
      return result.data;
    }
  },
);

const initialState: IInitState = {
  loading: false,
  posts: [],
  matchingPosts: [],
  registerPosts: [],
  currentRequestId: undefined,
};

const slice = createSlice({
  name: 'posts@',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(doGetMyListPost.fulfilled, (state, action) => {
        state.posts = action.payload?.Content?.Post;
      })
      .addCase(doGetMyListMatchingPost.fulfilled, (state, action) => {
        state.matchingPosts = action.payload?.Content?.Post;
      })
      .addCase(doGetMyListRegisterPost.fulfilled, (state, action) => {
        state.registerPosts = action.payload?.Content?.Post;
      })
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/pending'), // kết thúc action là /pending
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId; // mỗi lần gọi asyncThunk bất kỳ sẽ tạo ra 1 requestId unique
        },
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        action => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'), // kết thúc action là /pending
        (state, action) => {
          if (state.loading === true && state.currentRequestId === action.meta.requestId) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        },
      )
      .addDefaultCase((state, action) => {
        // console.log(`🟡 Action type ${action.type}`)
        // console.log(`🟡 Current state ${current(state)}`)
      });
  },
});
const { reducer: getMyListPost, actions } = slice;

export default getMyListPost;
