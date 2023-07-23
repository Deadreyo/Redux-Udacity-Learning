import { combineReducers } from "redux";
import todos from "./todos";
import goals from "./goals";
import loading from "./loading";


const rootReducer = combineReducers({
    todos,
    goals,
    loading,
})

export default rootReducer;