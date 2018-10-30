import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut() {
    this.props.firebase.auth().signOut()
    .then(() => this.props.setUser(null))

  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() {
    return (
      <section className="user">
        <nav className="navbar navbar-light bg-light">
          <h1 className="mr-auto" >Bloc Chat</h1>
          <div className="">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.props.user ? this.props.user.displayName : "Guest"}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#" onClick={() => this.handleSignIn()}>Sign In</a>
                  <a className="dropdown-item" href="#" onClick={() => this.handleSignOut()}>Sign out</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    )
  }
}

export default User;
