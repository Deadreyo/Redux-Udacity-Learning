import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadInitialData } from "../common/shared-actions";
import API from '../../api/api'

export const addTodo = createAsyncThunk('todos/addTodo', (name) => {
    return API.saveTodo(name)
    .catch(e => {
        alert(e);
        throw e
    });
})

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id) => {
    return API.saveTodoToggle(id)
        .catch(e => {alert(e); throw e;});
})

export const removeTodo = createAsyncThunk('todos/removeTodo', async (todo) => {
    return API.deleteTodo(todo)
        .catch(e => {
            alert(e);
            throw e
        })
})

const todosSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTodo(state, action) {
            state.push(action.payload);
        },
        toggleTodo: {
            reducer(state, { payload }) {
                const existingTodo = state.find(todo => todo.id === payload.id);
                if(existingTodo) existingTodo.completed = !existingTodo.completed
            },
            prepare(id) {
                return {
                    payload: {
                        id
                    }
                }
            }
        },
        removeTodo: {
            reducer(state, { payload }) {
                return state.filter(todo => todo.id !== payload.id)
            },
            prepare(id) {
                return {
                    payload: {
                        id
                    }
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadInitialData.fulfilled, (_, action) => {
            return action.payload.todos
        })
        .addCase(addTodo.fulfilled, (state, action) => {
            state.push(action.payload)
        })
        .addCase(toggleTodo.pending, (state, action) => {
            const id = action.meta.arg;
            const todo = state.find(todo => todo.id === id);
            todo.completed = !todo.completed;
        })
        .addCase(toggleTodo.rejected, (state, action) => {
            const id = action.meta.arg;
            const todo = state.find(todo => todo.id === id);
            todo.completed = !todo.completed;
        })
        .addCase(removeTodo.pending, (state, action) => {
            return state.filter(todo => todo.id !== action.meta.arg.id)
        })
        .addCase(removeTodo.rejected, (state, action) => {
            state.push(action.meta.arg)
        })
    }
})

const todosReducer = todosSlice.reducer;
export default todosReducer;