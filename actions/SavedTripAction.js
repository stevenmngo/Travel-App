import constant from '../contants'
import DayPickerAction from './DayPickerAction'
import HomeAction from './HomeAction'

const fetchSavedTrip = (uid) => {
	let string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/savedtrips?userid='${uid}'`
	return (dispatch, uid) => {
		return fetch(string)
				.then(res => res.json())
				.then(trips => {
					// console.log(trips)
					dispatch({
						type: constant.SAVETRIP.FETCH_SAVED_TRIP,
						payload: trips
					})
				});
	}
}


const removeSavedTrip = (id) => {
	where = JSON.stringify({
		tripID: id,
	})
	return (dispatch, getState, id) => {
		return fetch("http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/deletetrip", {
	            method: "POST",
	            headers: {
	              Accept: "application/json",
	              "Content-Type": "application/json"
	            },
				body: where
	          }).then(response => {
				  dispatch(fetchSavedTrip(getState().auth.user.user.uid))
	          });
			}
}

const fetchChoosenTrip = (id) => {
	let string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip?tripID='${id}'`
	return (dispatch, uid) => {
		return fetch(string)
			.then(res => res.json())
			.then(trip => {
				// console.log(trip)
				dispatch({
					type: constant.SAVETRIP.FETCH_CHOSEN_TRIP,
					payload: trip
				})
				// fetch tripPOI and put into store
				dispatch(fetchChoosenTripPOI(trip.userID, trip.tripID))
				// put the day info into store
				dispatch(DayPickerAction.setDate({
					start: trip.startDay,
					end: trip.endDay,
					total: trip.totalDay
				}))
				// put the home info into store
				dispatch(HomeAction.fetchDestination({ place_id: trip.destinationID}))
			});
	}
}

const fetchChoosenTripPOI = (userid, tripID) => {
	let string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/daydetail?tripID='${tripID}',userid='${userid}'`
	return (dispatch, uid) => {
		return fetch(string)
			.then(res => res.json())
			.then(dayPOI => {
				console.log(dayPOI)
				dispatch({
					type: constant.DAYDETAIL.SAVEDAY_POI,
					payload: dayPOI
				})
			});
	}
}



export default { fetchSavedTrip, removeSavedTrip, fetchChoosenTrip }