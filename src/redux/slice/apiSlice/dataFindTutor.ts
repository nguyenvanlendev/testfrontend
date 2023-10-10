import { createSlice } from '@reduxjs/toolkit';



interface DataFindTutor {
  GenderId: ListOption[];
  AcademicLevelId: ListOption[];
  SubjectIds: ListOption[];
  ClassIds: ListOption[];
  TeachingFormIds: ListOption[];
  AreaIds: ListOption[]
}



const initialState = {
 isLoading: false,
 dataFindTutor: {
  GenderId: [] as ListOption[],
  AcademicLevelId:  [] as ListOption[],
  SubjectIds:  [] as ListOption[],
  ClassIds:  [] as ListOption[],
  TeachingFormIds:  [] as ListOption[],
  AreaIds:  [] as ListOption[]
 } as DataFindTutor,
 error: {}
};

const slice = createSlice({
  name: 'findtutor@',
  initialState: initialState,
  reducers: {
    
    doUpdateDataFindTutor(state, action) {
      state.dataFindTutor = action.payload;
    },
    doClearDataFindTutor(state) {
      state.dataFindTutor.GenderId = [];
      state.dataFindTutor.AcademicLevelId = [];
      state.dataFindTutor.SubjectIds = [];
      state.dataFindTutor.TeachingFormIds = [];
      state.dataFindTutor.AreaIds = [];
    }
    
  },
  extraReducers: builder => {
    
  },
});
const { reducer: dataFindTutorReducer, actions } = slice;


export const { doUpdateDataFindTutor, doClearDataFindTutor } = actions;
export default dataFindTutorReducer;
