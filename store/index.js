import combinedReducer from '../reducer'
import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

const reduxStore = createStore(combinedReducer, applyMiddleware(logger))

export default reduxStore