import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSystem } from '../../../services/axios/apiSystem';
import { IDataFill } from '../../../@types/apiResponse';

// Type for addMatcher
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface IDataForm {
    academicLevels: IDataFill[];
    subjects: IDataFill[];
    classes: IDataFill[];
    forms: IDataFill[];
    areas: IDataFill[];
    loading: boolean;
    currentRequestId: string | undefined;
}

export const doGetDataform = createAsyncThunk('post@DataForm', async () => {
    const academicLevels = apiSystem.getAcademicLevelsSelection({});
    const subjects = apiSystem.getSubjectSelection({});
    const classes = apiSystem.getClasssSelection({});
    const forms = apiSystem.getTeachingFormSelection({});
    const areas = apiSystem.getAreaSelection({});
    const result = await Promise.all([academicLevels, subjects, classes, forms, areas]);
    return result;
});

const initialState: IDataForm = {
    academicLevels: [],
    subjects: [],
    classes: [],
    forms: [],
    areas: [],
    loading: false,
    currentRequestId: undefined
};

const dataFormSlice = createSlice({
    name: 'dataForms@',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(doGetDataform.fulfilled, (state, action) => {
                state.academicLevels = action.payload[0]?.data?.Content?.AcademicLevels?.map((item: { Id: number; Title: string; SearchText: string }) => ({
                    key: item.Id,
                    value: item.Title,
                }));
                state.subjects = action.payload[1]?.data?.Content?.Subjects?.map((item: { Id: number; Title: string; SearchText: string }) => ({
                    key: item.Id,
                    value: item.Title,
                }));
                state.classes = action.payload[2]?.data?.Content?.Classes?.map((item: { Id: number; Name: string; SearchText: string }) => ({
                    key: item.Id,
                    value: item.Name,
                  }));
                state.forms = action.payload[3]?.data?.Content?.Forms?.map((item: { Id: number; Title: string; SearchText: string }) => ({
                    key: item.Id,
                    value: item.Title,
                  }));
                state.areas = action.payload[4]?.data?.Content?.Areas?.map((item: { Id: number; Title: string; SearchText: string }) => ({
                    key: item.Id,
                    value: item.Title,
                  }));;
                state.loading = false;
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

const { reducer, actions } = dataFormSlice;

export default reducer;
