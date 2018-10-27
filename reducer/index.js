import {combineReducers} from 'redux'

import DayDetailReducer from './DayDetailReducer'
import HomeReducer from './HomeReducer'
import SavedTripReducer from './SavedTripReducer'
import SettingReducer from './SettingReducer'

const combinedReducers = combineReducers({
  home: HomeReducer,
  savedTrips: SavedTripReducer,
})

export default combinedReducers
