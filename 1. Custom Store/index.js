

// store
// is the state tree of the app and ways to:
// - get the state
// - listen to changes
// - update the state

// actions
// are payloads of information that send data from the app to the store.
// They are the only source of information for the store.
// You send them to the store using store.dispatch().

// reducers
// specify how the application's state changes in response to actions sent to the store.
// Remember that actions only describe what happened, but don't describe how the application's state changes.
// Reducers take the previous state and an action, and return the next state.

// dispatch
// is the way to send actions to the store.
// store.dispatch() is the only way to trigger a state change.

// subscribe
// registers a callback that the Redux store will call any time an action has been dispatched,
// and the state tree might have changed.
// You may then call getState() to read the current state tree inside the callback.

function createStore(reducer) {

    // state tree
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter((item) => item !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

// --------------------------------------------------------------

const ADD_TODO = "ADD_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
const ADD_GOAL = "ADD_GOAL"
const REMOVE_GOAL = "REMOVE_GOAL"

const todos = (state = [], action) => { // pure function
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.todo];
        case TOGGLE_TODO:
            return state.map((todo) => todo.id === action.id ? Object.assign({}, todo, {completed: !todo.complete}) 
            : todo)
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

const app = (state = {}, action) => { // root reducer
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

let store = createStore(app)

const unsubscribe = store.subscribe(() => {
    console.log("State was changed. New state: ", store.getState())
})
const AddTodo = (todo) => ({
    type: ADD_TODO,
    todo
})

const ToggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
})

const AddGoal = (goal) => (
    {
        type: ADD_GOAL,
        goal
    }
)

function RemoveGoalAction(id) { // action creator
    return {
        type: REMOVE_GOAL,
        id
    }
}

store.dispatch(AddTodo({
    name: "Learn Redux",
    id: 1,
    completed: false
}))
store.dispatch(ToggleTodo(1))
store.dispatch(AddGoal({
    name: "Major Goal",
    id: 1
}))
store.dispatch(RemoveGoalAction(1))