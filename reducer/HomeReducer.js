import constant from '../contants'

const initialState = { 
                        SelectedDestination: 
                        { 
                            structured_formatting: 
                            {
                                main_text:''
                            }
                        },
                    Destination: {},
                    fetching: false,
                    searchResult: []
                    }

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.HOME.SELECT_DESTINATION:
            return {
                ...state,
                SelectedDestination: action.payload,
            }
        case constant.HOME.REQUEST_SUGGESTION_DESTINATION:
            return {
                ...state,
                fetching: true,
            }
        case constant.HOME.RECEIVE_SUGGESTION_DESTINATION:
            return {
                ...state,
                fetching: false,
                searchResult: action.payload
            }
        case constant.HOME.REQUEST_DESTINATION:
            return {
                ...state,
                fetching: true,
            }
        case constant.HOME.RECEIVE_DESTINATION:
            return {
                ...state,
                fetching: false,
                Destination: action.payload
            }
        default:
            return state
    }
}
