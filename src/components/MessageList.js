import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    })
  }

  render() {
    return (
      <section className="message-list">
        <h3>{this.props.activeRoomName}</h3>
        {this.state.messages.map( (message, index) =>
          <div className="row" key={index}>
            <div className="col-md-12">{this.props.activeRoomId === message.roomId ? message.username : null}</div>
            <div className="col-md-6">{this.props.activeRoomId === message.roomId ? message.content : null}</div>
            <div className="col-md-6">{this.props.activeRoomId === message.roomId ? message.sentAt : null}</div>
          </div>
        )}
      </section>
    );
  }
}

export default MessageList;
