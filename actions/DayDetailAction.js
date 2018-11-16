import constant from '../contants'

const selectDestination = destination => ({
    type: constant.DAYDETAIL.SELECT_DESTINATION,
    payload: destination,
})

const requestSuggestionDestination = (input) => {
    return {
        type: constant.DAYDETAIL.REQUEST_DESTINATION,
        payload: input
    }
}

const receiveSuggestionDestination = (result) => {
    return {
        type: constant.DAYDETAIL.RECEIVE_DESTINATION,
        payload: result
    }
}

const fetchSuggestionDestination = (input) => {
    // APItoFectch = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + input + '&inputtype=textquery&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    APItoFectch = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + input + '&sensor=false&types=(regions)&key=AIzaSyATOfwkFBactzHfiPhkvW9jmcXb-L5pP-4'
    return (dispatch, input) => {
        dispatch(requestSuggestionDestination(input));
        return fetch(APItoFectch, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                result = responseJson.predictions
                APIResult = []
                for (thing of result) {
                    APIResult.push(thing.structured_formatting.main_text)
                }
                console.log(APIResult)
                dispatch(receiveSuggestionDestination(APIResult))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


export default { selectDestination, requestSuggestionDestination, receiveSuggestionDestination, fetchSuggestionDestination }
