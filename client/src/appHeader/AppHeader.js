import React, { Component } from 'react';
import './AppHeader.css';
import logo from '../logo.svg';

class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div className='App-header'>
            <img src={logo} className="mini-App-logo" alt="logo" />
            <h2 className='App-header-title'>App Title</h2>
        </div>
      )
  }
}

export default AppHeader