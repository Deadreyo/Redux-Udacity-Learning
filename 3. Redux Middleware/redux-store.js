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

let store = Redux.createStore(
    Redux.combineReducers({
        todos,
        goals,
    }),
    Redux.applyMiddleware(checker, logger)
)

const unsubscribe = store.subscribe(() => {
    const { todos, goals } = store.getState()

    document.getElementById("todoList").innerHTML = "";
    document.getElementById("goalList").innerHTML = "";
    todos.forEach(todo => addTodoElement(todo))
    goals.forEach(goal => addGoalElement(goal))
})

function addTodoElement(todo) {
    const node = document.createElement('li');
    node.innerText = todo.name;
    node.style.textDecoration = todo.completed? "line-through" : "none"

    node.onclick = () => {
        store.dispatch(ToggleTodoAction(todo.id))
    }

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "X"
    deleteButton.onclick = () => {
        store.dispatch(RemoveTodoAction(todo.id))
    }
    node.appendChild(deleteButton)
    document.getElementById("todoList").append(node);
}

function addGoalElement(goal) {
    const node = document.createElement('li');
    node.innerText = goal.name;

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "X"
    deleteButton.onclick = () => {
        store.dispatch(RemoveGoalAction(goal.id))
    }
    node.appendChild(deleteButton)
    document.getElementById("goalList").append(node);
}

const AddTodoAction = (todo) => ({
    type: ADD_TODO,
    todo
})

const ToggleTodoAction = (id) => ({
    type: TOGGLE_TODO,
    id
})
const RemoveTodoAction = (id) => ({
    type: REMOVE_TODO,
    id
})

const AddGoalAction = (goal) => (
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

document.getElementById("addTodo").onclick = () => {
    const name = document.getElementById("todoInput").value;
    document.getElementById("todoInput").value = "";

    store.dispatch(AddTodoAction({
        name,
        id: crypto.randomUUID(),
        completed: false
    }))
}

document.getElementById("addGoal").onclick = () => {
    const name = document.getElementById("goalInput").value;
    document.getElementById("goalInput").value = "";

    store.dispatch(AddGoalAction({
        name,
        id: crypto.randomUUID()
    }))
}