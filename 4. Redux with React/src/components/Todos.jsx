import { useRef } from "react";
import List from "./List";
import { AddGoalAction, AddTodoAction, RemoveTodoAction, ToggleTodoAction } from "../store/store";

export default function Todos({ store, todos }) {
    const inputRef = useRef();

    const handleAddTodo = () => {
        const name = inputRef.current.value;
        inputRef.current.value = "";

        store.dispatch(AddTodoAction({
            name,
            id: crypto.randomUUID(),
            completed: false,
        }))
    }

    const onToggle = (id) => {
        store.dispatch(ToggleTodoAction(id))
    }

    const onDelete = (id) => {
        store.dispatch(RemoveTodoAction(id))
    }

    return (
        <div>
            <h1>Todos</h1>
            <input
                type="text"
                placeholder="Add Todo"
                ref={inputRef}
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <List items={todos} onToggle={onToggle} onDelete={onDelete}/>
        </div>
    )
}
