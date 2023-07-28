import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice"
import goalsReducer from "../features/goals/goalsSlice"
import loadingReducer from "../features/common/loadingSlice"
import logger from "../middleware/logger";


const store = configureStore({
    reducer: {
        todos: todosReducer,
        goals: goalsReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
})

export default store;