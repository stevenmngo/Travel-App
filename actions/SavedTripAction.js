import constant from '../contants'

const fetchSavedTrip = (uid) => {
	let string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/savedtrips?userid='${uid}'`
	return (dispatch, uid) => {
		return fetch(string)
				.then(res => res.json())
				.then(trips => {
					console.log(trips)
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
				//   dispatch(fetchSavedTrip(getState().auth.user.user.uid))
	          });
			}
}

const fetchChoosenTrip = (id) => {
	let string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/savedtrips?tripID='${id}'`
	return (dispatch, uid) => {
		return fetch(string)
			.then(res => res.json())
			.then(trips => {
				console.log(trips)
				dispatch({
					type: constant.SAVETRIP.FETCH_CHOSEN_TRIP,
					payload: trips
				})
			});
	}
}



export default { fetchSavedTrip, removeSavedTrip }