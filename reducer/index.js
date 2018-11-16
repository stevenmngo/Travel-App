import {combineReducers} from 'redux'

import AuthReducer from './AuthReducer'
import DayDetailReducer from './DayDetailReducer'
import HomeReducer from './HomeReducer'
import SavedTripReducer from './SavedTripReducer'
import SettingReducer from './SettingReducer'

const combinedReducers = combineReducers({
  home: HomeReducer,
  savedTrips: SavedTripReducer,
  auth: AuthReducer,
})

export default combinedReducers
