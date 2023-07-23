import { RECEIVE_DATA } from "../actions/shared";
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "../actions/todos";

const todos = (state = [], action) => { // pure function
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.todo];
        case TOGGLE_TODO:
            return state.map((todo) => todo.id === action.id ? Object.assign({}, todo, {completed: !todo.completed}) 
            : todo)
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
        case RECEIVE_DATA:
            return action.todos
        default:
            return state;
    }

}

export default todos;