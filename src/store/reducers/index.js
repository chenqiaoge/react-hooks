import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

import loading from './loading'
import demo from './demo'


const rootReducer = combineReducers({
  demo,
  loading,
});

export default rootReducer