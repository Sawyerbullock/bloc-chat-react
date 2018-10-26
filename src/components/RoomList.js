import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      inputValue: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  createRoom(event) {
    this.roomsRef.push({
      name: this.state.inputValue
    });
    event.preventDefault();
    this.setState({ inputValue: '' })
  }

  render() {
    return (
      <section className="roomlist">
        <ul>
          {this.state.rooms.map( (room) =>
          <li key={room.key} >{room.name}</li>
        )}
        </ul>
        <form onSubmit={this.createRoom}>
          <fieldset>
            <label>New Room:</label>
            <input type="text" id="new-room" value={this.state.inputValue} onChange={this.handleChange} />
            <input type="submit" value="Submit"/>
          </fieldset>
        </form>
      </section>

    )
  }
}

export default RoomList;
