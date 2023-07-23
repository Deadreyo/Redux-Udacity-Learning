
const logger = (store) => (next) => (action) => {
    console.group(action.type);
        console.log("the action is: ", action)
        next(action);
        console.log("new state is: ", store.getState())
    console.groupEnd(action.type)
}

export default logger;