import { useRef } from "react";
import List from "./List";
import { handleAddGoal, handleRemoveGoal } from "../store/store";

export default function Goals({ store, goals }) {
    const inputRef = useRef();

    const addGoal = () => {
        store.dispatch(handleAddGoal(inputRef.current.value, () => inputRef.current.value = ""));
    }

    const onDelete = (goal) => {
        store.dispatch(handleRemoveGoal(goal))    
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
