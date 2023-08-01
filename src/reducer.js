// Update the logic for various handlers
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'SET_CUSTOMER_DATA':
        return {
                ...state,
                isLoading: false,
                customerData: action.payload,
            }
        case 'SET_SUBSCRIPTION_LOADING':
            return {
                ...state,
                isCustomerOptionSelected: true,
                isSubscriptionDataLoading: true
            }
        case 'HANDLE_SUBSCRIPTIONS':
            return {
                ...state,
                isSubscriptionDataLoading: false,
                subscriptions: action.payload.subscriptionData,
                consumptionData: []
            }
        case 'SET_CONSUMPTION_LOADING':
            return {
                ...state,
                isConsumptionDataLoading: true,
            }
        case 'HANDLE_CONSUMPTIONS':
            return {
                ...state,
                isConsumptionDataLoading: false,
                consumptionData: action.payload
            }
        default: 
            throw new Error(`no matching "${action.type}" action type`);
    }
}

export default reducer;