import { useRef } from "react";
import List from "./List";
import connect from "../store/connect";
import { handleAddGoal, handleRemoveGoal } from "../actions/goals";

function Goals({ dispatch, goals }) {
    const inputRef = useRef();

    const addGoal = () => {
        dispatch(handleAddGoal(inputRef.current.value, () => inputRef.current.value = ""));
    }

    const onDelete = (goal) => {
        dispatch(handleRemoveGoal(goal))    
    }

    return (
        <div>
            <h1>Goals</h1>
            <input
                type="text"
                placeholder="Add Goal"
                ref={inputRef}
            />
            <button onClick={addGoal}>Add Goal</button>
            <List items={goals} onDelete={onDelete}/>
        </div>
    )
}

const ConnectedGoals = connect((state) =>( {
    goals: state.goals
}))(Goals)

export default ConnectedGoals
