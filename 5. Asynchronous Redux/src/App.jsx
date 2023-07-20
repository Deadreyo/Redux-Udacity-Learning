import { useEffect, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Goals from './components/Goals';
import Todos from './components/Todos';
import { loadInitialData } from './store/store';

function App({ store }) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    
    const { todos, goals, loading } = store.getState();
    store.subscribe(() => {
        forceUpdate();
    })

    useEffect(() => {
        store.dispatch(loadInitialData())
    }, [])

    if(loading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <Todos store={store} todos={todos} />
            <Goals store={store} goals={goals} />
        </>
    )
}

export default App
