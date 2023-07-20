import { useRef } from "react";
import List from "./List";
import { handleAddTodo, handleRemoveTodo, handleToggleTodo } from "../store/store";

export default function Todos({ store, todos }) {
    const inputRef = useRef();

    const addTodo = () => {
        store.dispatch(handleAddTodo(inputRef.current.value, () => inputRef.current.value = ""))
    }

    const onToggle = (id) => {
        store.dispatch(handleToggleTodo(id))
    }

    const onDelete = (todo) => {
        store.dispatch(handleRemoveTodo(todo))
    }

    return (
        <div>
            <h1>Todos</h1>
            <input
                type="text"
                placeholder="Add Todo"
                ref={inputRef}
            />
            <button onClick={addTodo}>Add Todo</button>
            <List items={todos} onToggle={onToggle} onDelete={onDelete}/>
        </div>
    )
}
