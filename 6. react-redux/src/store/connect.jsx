import { useContext, useEffect, useReducer } from "react"
import { Context } from "./Provider"

export default function connect(mapStateToProps) {

    return (Component) => {
        return () => {
            let store = useContext(Context)
            let state = store.getState()
            let props = mapStateToProps(state);

            const [, forceUpdate] = useReducer(x => x + 1, 0);

            useEffect(() => {
                const unsubscribe = store.subscribe(() => {
                    forceUpdate();
                })

                return () => unsubscribe();
            }, [])
            return (
                <Component {...props} dispatch={store.dispatch} />
            )
        }
    }
}