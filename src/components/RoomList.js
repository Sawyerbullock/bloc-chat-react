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
    this.deleteRoom = this.deleteRoom.bind(this);

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
    this.roomsRef.on('child_removed', snapshot => {
      const deletedRoom = snapshot.val()
      deletedRoom.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.filter( room => room.key != deletedRoom.key )
      })
    })
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  createRoom(event) {
    if (this.state.inputValue !== ''){
      this.roomsRef.push({
        name: this.state.inputValue
      });
      event.preventDefault();
      this.setState({ inputValue: '' })
    } else {
      alert(`Room must have a name.`)
    }
  }

  deleteRoom(room) {
    this.roomsRef.child(room.key).remove()
      .then(() => {
        alert(`Room "${room.name}" has been deleted`);
      })
  }

  render() {
    return (
      <section className="">
        <nav className="navbar-left">
          <div className="nav-title">
            <h3>Chat Rooms</h3>
          </div>
          <ul className="nav flex-column">
            {this.state.rooms.map( (room, index) =>
            <li key={room.key} className="nav-item" onClick={() => this.props.changeRoom(room)} ><a href="#" className="text-dark">{room.name}</a><span className="ion-md-trash ml-1" onClick={() => this.deleteRoom(room)} ></span></li>
          )}
          </ul>
          <form onSubmit={this.createRoom} className="">
            <fieldset>
              <div className="row">
              <label className="mx-auto">New Room:</label>
              </div>
              <input className="row w-75 mx-auto" type="text" id="new-room" value={this.state.inputValue} onChange={this.handleChange} />
              <input type="submit" value="Submit" className="mt-1"/>
            </fieldset>
          </form>
        </nav>
      </section>

    )
  }
}

export default RoomList;
