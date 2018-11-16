import constant from '../contants'

const initialState = {
    SelectedDestination: '',
    fetching: false,
    searchResult: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.DAYDETAIL.SELECT_DESTINATION:
            return {
                ...state,
                SelectedDestination: action.payload,
            }
        case constant.DAYDETAIL.REQUEST_DESTINATION:
            return {
                ...state,
                fetching: true,
            }
        case constant.DAYDETAIL.RECEIVE_DESTINATION:
            return {
                ...state,
                fetching: false,
                searchResult: action.payload
            }
        default:
            return state
    }
}
