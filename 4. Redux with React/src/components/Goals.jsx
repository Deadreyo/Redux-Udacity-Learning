import { useRef } from "react";
import List from "./List";
import { AddGoalAction, RemoveGoalAction } from "../store/store";

export default function Goals({ store, goals }) {
    const inputRef = useRef();

    const handleAddGoal = () => {
        const name = inputRef.current.value;
        inputRef.current.value = "";

        store.dispatch(AddGoalAction({
            name,
            id: crypto.randomUUID(),
        }))
    }

    const onDelete = (id) => {
        store.dispatch(RemoveGoalAction(id))
    }

    return (
        <div>
            <h1>Goals</h1>
            <input
                type="text"
                placeholder="Add Goal"
                ref={inputRef}
            />
            <button onClick={handleAddGoal}>Add Goal</button>
            <List items={goals} onDelete={onDelete}/>
        </div>
    )
}
