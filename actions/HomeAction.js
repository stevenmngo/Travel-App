import constant from '../contants'

const selectDestination = destination => ({
  type: constant.HOME.SELECT_DESTINATION,
  payload: destination,
})

export default {selectDestination}
