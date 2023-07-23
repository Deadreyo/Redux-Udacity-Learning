import { useContext, useEffect, useReducer, useState } from 'react'
import ConnectedGoals from './Goals';
import ConnectedTodos from './Todos';
import { loadInitialData } from '../actions/shared';
import connect from '../store/connect';

function App({ dispatch, loading }) {

    useEffect(() => {
        dispatch(loadInitialData())
    }, [])

    if(loading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <ConnectedTodos />
            <ConnectedGoals />
        </>
    )
}

const ConnectedApp = connect((state) => ({
    loading: state.loading
}))(App)
export default ConnectedApp
