import { createSlice } from '@reduxjs/toolkit'


const initialState= {
    currentTask : null,
    userId: null,
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
        },
        setUserId(state, action) {
            state.userId = action.payload;
        }
    },
})

export const {
    setCurrentTask,
    finishCurrentTask,
    setUserId,
} = rootSlice.actions
export default rootSlice.reducer