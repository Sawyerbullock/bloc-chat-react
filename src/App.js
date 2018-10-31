import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'
import User from './components/User.js'

var config = {
    apiKey: "AIzaSyCr4uiRsm_yxjjZKEPMpLPtrWfol7XxYSA",
    authDomain: "bloc-chat-react-ec7ef.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-ec7ef.firebaseio.com",
    projectId: "bloc-chat-react-ec7ef",
    storageBucket: "bloc-chat-react-ec7ef.appspot.com",
    messagingSenderId: "903356052615",
    };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoomName: '',
      activeRoomId: '',
      user: '',
    }
  }

  setUser(user) {
    this.setState({
      user: user,
    });
  }

  changeRoom(room) {
    this.setState({
      activeRoomName: room.name,
      activeRoomId: room.key,
    })
  }

  render() {
    return (
      <div className="App">
      <User firebase={firebase} setUser={(user) => this.setUser(user)} user={this.state.user} />
      <RoomList firebase={firebase} changeRoom={(room) => this.changeRoom(room)} />
      <MessageList firebase={firebase} user={this.state.user.displayName} activeRoomName={this.state.activeRoomName} activeRoomId={this.state.activeRoomId} />
      </div>
    );
  }
}

export default App;
