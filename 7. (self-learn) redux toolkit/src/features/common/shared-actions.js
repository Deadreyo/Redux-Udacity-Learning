import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../api/api'

export const loadInitialData = createAsyncThunk("loadInitialData", async () => {
    const [todos, goals] = await Promise.all([
        API.fetchTodos(),
        API.fetchGoals()
    ])

    return {
        todos,
        goals
    }
})