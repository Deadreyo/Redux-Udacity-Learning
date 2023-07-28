import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadInitialData } from "../common/shared-actions";
import API from '../../api/api'

export const addGoal = createAsyncThunk('goals/goalAdded', async (name) => {
    try {
        const goal = await API.saveGoal(name)
        return goal;
    } catch(e) {
        alert(e)
        throw e
    }
})

export const removeGoal = createAsyncThunk('goals/goalRemoved', (goal) => {
    return API.deleteGoal(goal.id)
})


const goalsSlice = createSlice({
    name: "goals",
    initialState: [],
    reducers: {
        removeGoal(state, { payload }) {
            return state.filter(goal => goal.id !== payload.id)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadInitialData.fulfilled, (_, { payload }) => {
            return payload.goals
        })
        .addCase(addGoal.fulfilled, (state, { payload }) => {
            state.push(payload)
        })
        .addCase(removeGoal.pending, (state, action) => {
            const id = action.meta.arg.id
            return state.filter(goal => goal.id !== id);
        })
        .addCase(removeGoal.rejected, (state, action) => {
            state.push(action.meta.arg)
        })
    }
})

export default goalsSlice.reducer;
