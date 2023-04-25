import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios'; 
import { takeEvery, put } from 'redux-saga/effects';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// //this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return action.payload 
    default:
      return state;
  }
};

//This is the reducer's action!
function* fetchPlant() {
 try {
  const plant = yield axios.get('/api/plant');
  yield put({type: 'ADD_PLANT', payload: plant.data})
 } catch (error) {
  console.log(`error in fetchPlant: ${error}`);
  alert('Something went wrong!')
 }
}


function* postPlant(action) {
  try {
      yield axios.post('/api/plant', action.payload);
      // Call the GET
      yield put({ type: 'FETCH_' })
      // We can pass functions through actions
      action.setNewElement('')
  } catch (error) {
      console.log(`error is postElement`);
      alert('Something went wrong!');
  }
}
function* rootSaga() {
  //! Do not use the same action as the reducer
  yield takeEvery('FETCH_PLANT', fetchPlant )
}

const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({ plantList }),


  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);


// Add `redux-sagas` to the project to make an API
//  request. The route `http://localhost:5000/api/plant` 
//  returns an array of plants. Display that array
//  on the `PlantList` component on load.