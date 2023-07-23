import API from '../api/api'

export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const REMOVE_TODO = "REMOVE_TODO"

const AddTodo = (todo) => ({
    type: ADD_TODO,
    todo
})

const ToggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
})

const RemoveTodo = (id) => ({
    type: REMOVE_TODO,
    id
})

export function handleAddTodo(name, callback) {
    return (dispatch) => {
        API.saveTodo(name)
            .then((todo) => {
                dispatch(AddTodo(todo));
                callback && callback();
            })
            .catch(() => alert("Error occured."))
    }
}


export function handleToggleTodo(id) {
    return (dispatch) => {
        // Optimistic UI updates
        dispatch(ToggleTodo(id))

        API.saveTodoToggle(id)
            .catch( () => {
                dispatch(ToggleTodo(id))
                alert("Error occured.")
            })
    }
}


export function handleRemoveTodo(todo) {
    return (dispatch) => {
        dispatch(RemoveTodo(todo.id))

        API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(AddTodo(todo))
                alert("Error occured.")
            })
    }
}
