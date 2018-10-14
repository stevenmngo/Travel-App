import constant from '../contants'

const initialState = { SelectedDestination: ''}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.HOME.SELECT_DESTINATION:
            return {
                ...state,
                SelectedDestination: action.payload,
            }
        default:
            return state
    }
}