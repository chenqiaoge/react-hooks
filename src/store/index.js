import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/index'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['loading', 'demo']  // 需要持久化的reducer
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = createStore(persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export let persistor = persistStore(store)
export default store