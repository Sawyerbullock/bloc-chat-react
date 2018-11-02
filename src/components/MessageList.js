import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      inputValue: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    })
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  deleteMessage(message) {

  }

  sendMessage() {
    var today = new Date();
    var hour = today.getHours();
    var abbreviation = (hour > 12)? " pm" : " am";
    hour = (hour > 12)? hour - 12 : hour;
    var minutes = today.getMinutes();
    minutes = "0000" + minutes;
    if (this.state.inputValue !== ''){
      this.messagesRef.push({
        username: this.props.user? this.props.user.displayName : "Guest",
        content: this.state.inputValue,
        roomId: this.props.activeRoomId,
        sentAt: hour + ":" + minutes.slice(-2) + abbreviation
      });
      this.setState({ inputValue: '', });
    } else {
      alert(`Message is blank`);
    }
  }

  render() {
    return (
      <section className="message-list">
        <h3>{this.props.activeRoomName}</h3>
        {this.state.messages.map( (message, index) =>
          <div className="row" key={index}>
            <div className="col-md-12 text-left mt-2">{this.props.activeRoomId === message.roomId ? message.username + ":" : false}</div>
            <div className="col-md-6 text-left">{this.props.activeRoomId === message.roomId ? message.content : null}</div>
            <div className="col-md-6 text-right">{this.props.activeRoomId === message.roomId ? message.sentAt : null}</div>
          </div>
        )}
        <form onSubmit={this.sendMessage}>
          <div className="form-row fixed-bottom mb-2 ml-auto w-75 ">
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} className="form-control col-md-10" placeholder="Type message here..."></input>
            <input type="submit" value="submit" className="btn btn-primary ml-2"/>
          </div>
        </form>
      </section>
    );
  }
}

export default MessageList;
