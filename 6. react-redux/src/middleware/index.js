import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import checker from "./checker";
import logger from "./logger";

const middlewares = applyMiddleware(
    thunk, checker, logger
)

export default middlewares