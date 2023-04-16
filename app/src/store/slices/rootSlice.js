import { createSlice } from '@reduxjs/toolkit'


const initialState= {
    currentTask : null
};

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setCurrentTask(state, action) {
            state.currentTask = action.payload;
        },
        finishCurrentTask(state) {
            state.currentTask = null;
        }
    },
})

export const {
    setCurrentTask, finishCurrentTask
} = rootSlice.actions
export default rootSlice.reducer