import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'

var config = {
    apiKey: "AIzaSyCr4uiRsm_yxjjZKEPMpLPtrWfol7XxYSA",
    authDomain: "bloc-chat-react-ec7ef.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-ec7ef.firebaseio.com",
    projectId: "bloc-chat-react-ec7ef",
    storageBucket: "bloc-chat-react-ec7ef.appspot.com",
    messagingSenderId: "903356052615"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: 'hello',
    }
  }

  changeRoom(room) {
    console.log(room.key)
  }

  render() {
    return (
      <div className="App">
      <RoomList firebase={firebase} changeRoom={(room) => this.changeRoom(room)} />
      <MessageList firebase={firebase} />
      </div>
    );
  }
}

export default App;
