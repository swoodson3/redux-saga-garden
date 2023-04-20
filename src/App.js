import React from 'react';
import Garden from './components/Garden/Garden';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { useState, useEffect } from 'react';
import './App.css';

function App (){
  return(
    <div className="App">
      <header className="App-header">
        <h1>Welcome to your garden!</h1>
      </header>
      <Garden />
    </div>
  )
}

export default App;
