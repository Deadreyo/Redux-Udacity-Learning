import { useRef } from "react";
import List from "./List";
import { handleAddTodo, handleRemoveTodo, handleToggleTodo } from "../actions/todos.js";
import connect from "../store/connect";

function Todos({ dispatch, todos }) {
    const inputRef = useRef();

    const addTodo = () => {
        dispatch(handleAddTodo(inputRef.current.value, () => inputRef.current.value = ""))
    }

    const onToggle = (id) => {
        dispatch(handleToggleTodo(id))
    }

    const onDelete = (todo) => {
        dispatch(handleRemoveTodo(todo))
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

const ConnectedTodos = connect((state) => ({
    todos: state.todos
}))(Todos)

export default ConnectedTodos
