import constant from '../contants'

const initialState = {
	savedTrips: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case constant.SAVETRIP.FETCH_SAVED_TRIP:
			return {
				...state,
				savedTrips: action.payload,
			}
		default:
			return state
	}
}
