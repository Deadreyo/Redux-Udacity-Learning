import API from '../api/api'

export const RECEIVE_DATA = "RECEIVE_DATA"

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