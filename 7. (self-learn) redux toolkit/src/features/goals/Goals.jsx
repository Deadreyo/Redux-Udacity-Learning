import { useRef } from "react";
import List from "../../components/List";
import { useDispatch, useSelector } from "react-redux";
import { addGoal, removeGoal } from "./goalsSlice";

function Goals() {
    const dispatch = useDispatch()
    const goals = useSelector(state => state.goals)
    const inputRef = useRef();

    const onAddGoal = () => {
        dispatch(addGoal(inputRef.current.value, () => inputRef.current.value = "")).unwrap();
    }

    const onDelete = (goal) => {
        dispatch(removeGoal(goal))    
    }

    return (
        <div>
            <h1>Goals</h1>
            <input
                type="text"
                placeholder="Add Goal"
                ref={inputRef}
            />
            <button onClick={onAddGoal}>Add Goal</button>
            <List items={goals} onDelete={onDelete}/>
        </div>
    )
}

export default Goals
