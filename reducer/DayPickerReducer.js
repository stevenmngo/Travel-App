import constant from '../contants'

const initialState = {
    start: '',
    end: '',
    total: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.DAYPICKER.SET_DATE:
            return {
                ...state,
                start: action.payload.start,
                end: action.payload.end,
                total: action.payload.total,
            }
        default:
            return state
    }
}
