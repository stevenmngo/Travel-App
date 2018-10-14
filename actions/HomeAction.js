import constant from '../contants'

const selectDestination = (destination) => {
    return {
        type: constant.HOME.SELECT_DESTINATION,
        payload: destination
    }
}

export default { selectDestination }