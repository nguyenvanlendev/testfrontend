import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiTutor } from '../../../services/axios/apiTutor';
import { AxiosResponse } from 'axios';

interface ITutorProfiles {
  isLoading: boolean;
  tutorProfiles: ITutor[];
  profileDetail: ITutorProfileDetail;
  error: {};
  isValid?: boolean;
  isUpSertProfile?: boolean;
}

export const doGetTutorProfiles = createAsyncThunk(
  'totor@get/tutorProfiles',
  async (param: IParamCreateGetListTutor) => {
    const result: AxiosResponse = await apiTutor.getTutorProfiles(param);
    return result.data;
  },
);

export const doCreateTutor = createAsyncThunk('totor@post/CreateTutor', async (param: FormData) => {
  const result: AxiosResponse = await apiTutor.createTutor(param);
  return result.data;
});

export const doUpdateTutor = createAsyncThunk('totor@post/UpdateTutor', async (param: FormData) => {
  const result: AxiosResponse = await apiTutor.updateTutor(param);
  return result.data;
});
let initProfileDetail = {
  tutorid: -1,
  fullname: '',
  birthdate: '',
  phone: '',
  academiclevel: [],
  experience: '',
  totalrating: 0,
  gender: [],
  avatar: '',
  certificated: undefined,
  subjects: [],
  classes: [],
  teachingForms: [],
  areas: [],
  degreefiles: [],
  degreefilesDefault: [],
  degreeremoveids: [],
  studentcardfiles: [],
  studentcardfilesDefault: [],
  studentcardremoveids: [],
  identitybeforefile: '',
  identityafterfile: '',
  identitiesDefault: [],
  removefileids: [],
};

const initialState: ITutorProfiles = {
  isLoading: false,
  tutorProfiles: [],
  profileDetail: initProfileDetail,
  error: {},
  isValid: true,
  isUpSertProfile: false,
};

const slice = createSlice({
  name: 'tutorProfiles@',
  initialState: initialState,
  reducers: {
    doUpdateProfile(state, action) {
      state.profileDetail = {
        ...state.profileDetail,
        ...action.payload,
      };
    },
    doUpdateValidation(state, action) {
      state.isValid = action.payload.isValid;
    },
    doResetProfile(state) {
      state.profileDetail = initProfileDetail;
      state.isUpSertProfile = false;
    },
    doCreateOrUpdateTutorProfile(state, action) {
      state.isUpSertProfile = action.payload.isUpSertProfile;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(doGetTutorProfiles.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(doGetTutorProfiles.fulfilled, (state, action) => {
        state.tutorProfiles = action.payload.Content.Tutors;
        state.isLoading = false;
      })
      .addCase(doGetTutorProfiles.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(doCreateTutor.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(doCreateTutor.fulfilled, (state, action) => {
        // state.tutorProfiles = action.payload.content.Tutors;
        state.profileDetail = initProfileDetail;
        state.isLoading = false;
        state.isUpSertProfile = true;
      })
      .addCase(doCreateTutor.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(doUpdateTutor.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(doUpdateTutor.fulfilled, (state, action) => {
        state.profileDetail = initProfileDetail;
        state.isLoading = false;
        state.isUpSertProfile = true;
      })
      .addCase(doUpdateTutor.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

const { reducer: getTutorProfiles, actions } = slice;
export const { doUpdateProfile, doUpdateValidation, doCreateOrUpdateTutorProfile, doResetProfile } = actions;

export default getTutorProfiles;
