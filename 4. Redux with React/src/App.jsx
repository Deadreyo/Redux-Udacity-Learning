import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Goals from './components/Goals';
import Todos from './components/Todos';

function App({ store }) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    
    const { todos, goals } = store.getState();
    store.subscribe(() => {
        forceUpdate();
    })
    return (
        <>
            <Todos store={store} todos={todos} />
            <Goals store={store} goals={goals} />
        </>
    )
}

export default App
