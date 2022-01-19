import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import '../App.css';
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas'
import Home from '../components/Home'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga)

export const CreatePage = () => {

	return (
		<Provider store={store}>
			<Home />
		</Provider>
	)
}