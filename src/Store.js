import React, { createContext, useReducer } from 'react';
import reducer from './Reducer';

const initialState = {
    indexOfRowsToCollapse: [],
    score: 0,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }