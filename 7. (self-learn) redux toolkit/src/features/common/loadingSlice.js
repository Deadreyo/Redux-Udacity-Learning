import { createSlice } from "@reduxjs/toolkit";
import { loadInitialData } from "./shared-actions";


const loadingSlice = createSlice({
    name: "loading",
    initialState: true,
    extraReducers: (builder) => {
        builder.addCase(loadInitialData.fulfilled, (state) => false)
    }
})

export default loadingSlice.reducer;