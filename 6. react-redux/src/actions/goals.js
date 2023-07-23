import API from '../api/api'

export const ADD_GOAL = "ADD_GOAL"
export const REMOVE_GOAL = "REMOVE_GOAL"

const AddGoal = (goal) => (
    {
        type: ADD_GOAL,
        goal
    }
)

function RemoveGoal(id) { // action creator
    return {
        type: REMOVE_GOAL,
        id
    }
}

export const handleAddGoal = (name, callback) => dispatch => {
    return API.saveGoal(name)
        .then((todo) => {
            dispatch(AddGoal(todo));
            callback && callback()
        })
        .catch(() => alert("Error occured."))
}


export const handleRemoveGoal = (goal) => dispatch => {
    dispatch(RemoveGoal(goal.id))

    return API.deleteGoal(goal.id)
        .catch(() => {
            dispatch(AddGoal(goal))
            alert("Error occured.")
        })
}
