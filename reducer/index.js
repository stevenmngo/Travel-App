import DayDetailReducer from './DayDetailReducer'
import HomeReducer from './HomeReducer'
import SavedTripReducer from './SavedTripReducer'
import SettingReducer from './SettingReducer'

import { combineReducers } from 'redux'

const combinedReducers = combineReducers({
    HomeReducer
})

export default combinedReducers