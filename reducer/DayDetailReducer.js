import constant from '../contants'

const initialState = {
    fetching: false,
    fetchedPOI: [{name: ""}]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.DAYDETAIL.REQUEST_POI:
            return {
                ...state,
                fetching: true,
            }
        case constant.DAYDETAIL.RECEIVE_POI:
            return {
                ...state,
                fetching: false,
                fetchedPOI: action.payload
            }
        default:
            return state
    }
}
