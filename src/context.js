import React, {useContext, useEffect, useReducer} from "react";

import reducer from './reducer';


const initialState = {
    isLoading: true,
    originalCustomerData: [],
    customerData: [],
    query: '',
}

const API_ENDPOINT = 'http://localhost:5000/api'
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
                payload: data['customerData']
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (query) => {
        dispatch({type: 'HANDLE_SEARCH', payload: query})
    }

   
    useEffect(()=>{
        fetchData(`${API_ENDPOINT}/getCustomerData`);
    }, [])

    return (
        <AppContext.Provider
                value={{...state, handleSearch}}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider}