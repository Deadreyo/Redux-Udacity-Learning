import * as Redux from "redux";

const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const ADD_GOAL = "ADD_GOAL"
const REMOVE_GOAL = "REMOVE_GOAL"

const todos = (state = [], action) => { // pure function
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.todo];
        case TOGGLE_TODO:
            return state.map((todo) => todo.id === action.id ? Object.assign({}, todo, {completed: !todo.completed}) 
            : todo)
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
        default:
            return state;
    }

}

const goals = (state = [], action) => {
    switch (action.type) {
        case ADD_GOAL:
            return [...state, action.goal]
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id)
        default:
            return state;
    }
}

const checker = function (store) {
    return function(next) {
        return function(action) {
            if(action.type === ADD_GOAL && action.goal.name.toLowerCase().includes("bitcoin")) {
                return alert("No bitcoin allowed")
            }

            if(action.type === ADD_TODO && action.todo.name.toLowerCase().includes("bitcoin")) {
                return alert("No bitcoin allowed")
            }

            next(action)
        }
    }
}

const logger = (store) => (next) => (action) => {
    console.group(action.type);
        console.log("the action is: ", action)
        next(action);
        console.log("new state is: ", store.getState())
    console.groupEnd(action.type)
}

export const store = Redux.createStore(
    Redux.combineReducers({
        todos,
        goals,
    }),
    Redux.applyMiddleware(checker, logger)
)

export const AddTodoAction = (todo) => ({
    type: ADD_TODO,
    todo
})

export const ToggleTodoAction = (id) => ({
    type: TOGGLE_TODO,
    id
})
export const RemoveTodoAction = (id) => ({
    type: REMOVE_TODO,
    id
})

export const AddGoalAction = (goal) => (
    {
        type: ADD_GOAL,
        goal
    }
)

export function RemoveGoalAction(id) { // action creator
    return {
        type: REMOVE_GOAL,
        id
    }
}
