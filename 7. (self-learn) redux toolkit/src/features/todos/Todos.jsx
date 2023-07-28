import { useRef } from "react";
import List from "../../components/List";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "./todosSlice";

function Todos() {
    
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)

    const inputRef = useRef();

    const onAddTodo = async () => {
        await dispatch(addTodo(inputRef.current.value)).unwrap()
        inputRef.current.value = ""
    }

    const onToggle = (id) => {
        dispatch(toggleTodo(id))
    }

    const onDelete = (todo) => {
        dispatch(removeTodo(todo))
    }

    return (
        <div>
            <h1>Todos</h1>
            <input
                type="text"
                placeholder="Add Todo"
                ref={inputRef}
            />
            <button onClick={onAddTodo}>Add Todo</button>
            <List items={todos} onToggle={onToggle} onDelete={onDelete}/>
        </div>
    )
}

export default Todos
