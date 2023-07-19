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
                data: action.payload.data,
            }
        case 'HANDLE_SEARCH':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
            }
        case 'HANDLE_SUBSCRIPTION':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
            }
        case 'HANDLE_COMPUTING_RESOURCES':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
            }
        default: 
            throw new Error(`no matching "${action.type}" action type`);
    }
}

export default reducer;