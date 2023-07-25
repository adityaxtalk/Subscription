import React, {useContext, useEffect, useReducer} from "react";

import reducer from './reducer';


const initialState = {
    isLoading: true,
    subscriptions: [],
    customerData: [],
    isSubscriptionDataLoading: true,
    isConsumptionDataLoading: false,
    consumptionData: [],
    isCustomerOptionSelected: false,
}

const API_ENDPOINT = process.env.REACT_APP_API_URL;
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

    const handleSubscriptions = async (customerId) =>{
        dispatch({ type: 'SET_SUBSCRIPTION_LOADING' })
        try {
            const url = `${API_ENDPOINT}/api/getSubscriptionData/${customerId}`;
            const response = await fetch(url);
            const data=await response.json();
            dispatch({type: 'HANDLE_SUBSCRIPTIONS', payload: data});
        } catch (error) {
            console.log(error);
        }
    }

    const fetchConsumptionData = async (subscriptionId) =>{
        dispatch({ type: 'SET_CONSUMPTION_LOADING' })
        try {
            let consumption = await fetch(`${API_ENDPOINT}/api/getConsumptionDetail/${subscriptionId}`);
            consumption= await consumption.json()
            consumption=consumption.consumptionData;
            let resource= await fetch(`${API_ENDPOINT}/api/getResourceGroups/${subscriptionId}`);
            resource= await resource.json();
            resource=resource.resourceData;
            const mergedData=[]
            for (let i = 0; i<consumption.length; i++) {
                const {id, ...temp}={
                    ...consumption[i],
                    ...resource.find(item => consumption[i].id === item.resourceGroupId)
                }
                mergedData.push(temp)
             }
             console.log(mergedData)
             dispatch({type: 'HANDLE_CONSUMPTIONS', payload: mergedData});
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData(`${API_ENDPOINT}/api/getCustomerData`);
    }, [])

    return (
        <AppContext.Provider
                value={{...state, handleSubscriptions, fetchConsumptionData}}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider}