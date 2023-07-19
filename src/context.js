import React, {useContext, useEffect, useReducer} from "react";

import reducer from './reducer';


const initialState = {
    isLoading: true,
    customerData: [],
    query: '',
}

const API_ENDPOINT = 'http://localhost:3000'
const AppContext=React.createContext();

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchData = async (url) =>{
        dispatch({ type: 'SET_LOADING' })
        try {
            // Update the query based on the payload data
            const response = await fetch(url);
            const data= await response.json();
            dispatch({
                type: 'SET_CUSTOMER_DATA',
                payload: {customerData:data}
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (query) => {
        dispatch({type: 'HANDLE_SEARCH', payload: query})
    }

    const handleSubscriptions = (query) => {
        dispatch({type: 'HANDLE_SUBSCRIPTION', payload: query})
    }

    const handleComputingResources = (query) => {
        dispatch({type: 'HANDLE_COMPUTING_RESOURCES', payload: query})
    }

    useEffect(()=> {
        // Update the fetchData function based on the query
    }, [state.query])

    return (
        <AppContext.Provider
                value={{...state, handleSearch, handleComputingResources, handleSubscriptions }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider}