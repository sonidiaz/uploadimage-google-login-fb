import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';


var config = {
    apiKey: "AIzaSyCKA4fWk25dd_MhRo7l6cbQH9oB_QgLnHk",
    authDomain: "psoudogram.firebaseapp.com",
    databaseURL: "https://psoudogram.firebaseio.com",
    storageBucket: "psoudogram.appspot.com",
    messagingSenderId: "214622712057"
  };

firebase.initializeApp(config);




ReactDOM.render(
  <App />,
  document.getElementById('root')
);
