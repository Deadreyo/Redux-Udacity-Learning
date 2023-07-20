import * as Redux from "redux";
import thunk from "redux-thunk";

const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const ADD_GOAL = "ADD_GOAL"
const REMOVE_GOAL = "REMOVE_GOAL"
const RECEIVE_DATA = "RECEIVE_DATA"

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

const goals = (state = [], action) => {
    switch (action.type) {
        case ADD_GOAL:
            return [...state, action.goal]
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id)
        case RECEIVE_DATA:
            return action.goals
        default:
            return state;
    }
}

const loading = (state = true, action) => {
    switch(action.type) {
        case RECEIVE_DATA:
            return false;
        default:
            return state
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
        loading
    }),
    Redux.applyMiddleware(thunk, checker, logger)
)

const AddTodoAction = (todo) => ({
    type: ADD_TODO,
    todo
})

export function handleAddTodo(name, callback) {
    return (dispatch) => {
        API.saveTodo(name)
            .then((todo) => {
                dispatch(AddTodoAction(todo));
                callback && callback();
            })
            .catch(() => alert("Error occured."))
    }
}

const ToggleTodoAction = (id) => ({
    type: TOGGLE_TODO,
    id
})

export function handleToggleTodo(id) {
    return (dispatch) => {
        // Optimistic UI updates
        dispatch(ToggleTodoAction(id))

        API.saveTodoToggle(id)
            .catch( () => {
                dispatch(ToggleTodoAction(id))
                alert("Error occured.")
            })
    }
}

const RemoveTodoAction = (id) => ({
    type: REMOVE_TODO,
    id
})

export function handleRemoveTodo(todo) {
    return (dispatch) => {
        dispatch(RemoveTodoAction(todo.id))

        API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(AddTodoAction(todo))
                alert("Error occured.")
            })
    }
}

const AddGoalAction = (goal) => (
    {
        type: ADD_GOAL,
        goal
    }
)

export const handleAddGoal = (name, callback) => dispatch => {
    return API.saveGoal(name)
        .then((todo) => {
            dispatch(AddGoalAction(todo));
            callback && callback()
        })
        .catch(() => alert("Error occured."))
}

function RemoveGoalAction(id) { // action creator
    return {
        type: REMOVE_GOAL,
        id
    }
}

export const handleRemoveGoal = (goal) => dispatch => {
    dispatch(RemoveGoalAction(goal.id))

    return API.deleteGoal(goal.id)
        .catch(() => {
            dispatch(AddGoalAction(goal))
            alert("Error occured.")
        })
}

function ReceiveDataAction(todos, goals) {
    return {
        type: RECEIVE_DATA,
        todos,
        goals
    }
}

export function loadInitialData() {
    return (dispatch) => {
        Promise.all([
            API.fetchTodos(),
            API.fetchGoals()
        ]).then(([todos, goals]) => {
            dispatch(ReceiveDataAction(todos, goals))
        })

    }
}