import { combineReducers } from '@reduxjs/toolkit';
import currentUserReducer from '../slice/apiSlice/currentUserSlice';
import getListTutorReducer from '../slice/apiSlice/listTutorSlice';
import getTutorProfiles from '../slice/apiSlice/tutorProfiles';
import getMyListPost from '../slice/apiSlice/post';
import dataForm from '../slice/apiSlice/dataForm';
import listNotiReducer from '../slice/apiSlice/notiffycationSlice';
import numNotiReducer from '../slice/apiSlice/numNotifSlice';
import dataFindTutorReducer from '../slice/apiSlice/dataFindTutor';

export const rootReducer = combineReducers({
  currentUserReducer,
  getListTutorReducer,
  getTutorProfiles,
  getMyListPost,
  dataForm,
  listNotiReducer,
  numNotiReducer,
  dataFindTutorReducer
});
