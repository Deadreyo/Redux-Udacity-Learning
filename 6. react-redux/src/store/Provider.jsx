import { createContext } from "react";

export let Context = createContext()

export default function Provider({ store, children }) {

    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
}