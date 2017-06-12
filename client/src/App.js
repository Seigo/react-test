import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'

import AppHeader from './appHeader/AppHeader'
import XptoBody from './xptoBody/XptoBody'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <XptoBody />
      </div>
    )
  }
}
export default App