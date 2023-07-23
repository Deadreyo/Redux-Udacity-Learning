import { ADD_GOAL } from "../actions/goals"
import { ADD_TODO } from "../actions/todos"

const checker = function (store) {
    return function(next) {
        return function(action) {
            if(action.type === ADD_GOAL && action.goal.name.toLowerCase().includes("bitcoin")) {
                return alert("No bitcoin allowed")
            }

            if(action.type === ADD_TODO && action.todo.name.toLowerCase().includes("bitcoin")) {
                return alert("No bitcoin allowed")
            }

            next(action)
        }
    }
}

export default checker;