import { useContext, useEffect, useReducer, useState } from 'react'
import Goals from '../features/goals/Goals';
import Todos from '../features/todos/Todos';
import { useDispatch, useSelector } from 'react-redux';
import { loadInitialData } from '../features/common/shared-actions';

function App() {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)

    useEffect(() => {
        dispatch(loadInitialData())
    }, [])

    if(loading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <Todos />
            <Goals />
        </>
    )
}

export default App
