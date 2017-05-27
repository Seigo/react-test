import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import XptoService from './XptoService';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xptos: []
    }
  }

  componentDidMount() {
    XptoService.getInitial((xptos) => {
      this.setState({xptos: xptos})
    })
  }

  rowClicked = (index) => {
    let {xptos} = this.state
    xptos[index][0] = !xptos[index][0]
    this.setState({xptos: xptos})
  }

  actOnRows = (objective) => {
    let {xptos} = this.state
    const selectedOnes = xptos
        .filter(s => s[0])
    XptoService.execute({
      objective: objective,
      xptos: selectedOnes
    })
    //this.setState({xptos: xptos})
  }
  
  render() {
    let {xptos} = this.state;

    const selectedCount = xptos
        .filter((row) => row[0])
        .length

    const tableRows = xptos.map((value, i) => 
        <tr
          key={i}
          onClick={() => this.rowClicked(i)}
        >
          <td className="mdl-cell"> {value[0] ? 'true' : ''} </td>
          <td> {value[1]} </td>
          <td> {value[2]} </td>
          <td> {value[3]} </td>
          <td> {value[4]} </td>
        </tr>
    )

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="mini-App-logo" alt="logo" />
          <h2>XPTO</h2>
        </div>
        <div className="App-body">
          <p className="commandBar" hidden={!selectedCount}>  
            <span> {selectedCount} selected </span>
            <button className="myBtn" onClick={() => this.actOnRows('Add')}>
              <span className="glyphicon glyphicon-plus" />
              Add
            </button>
            <button className="myBtn" onClick={() => this.actOnRows('Find')}>
              <span className="myBtn glyphicon glyphicon-search" />
              Find
            </button>
            <button className="myBtn" onClick={() => this.actOnRows('Disable')}>
              <span className="myBtn glyphicon glyphicon-trash" />
              Disable
            </button>
            <button className="myBtn" onClick={() => this.actOnRows('Enable')}>
              <span className="myBtn glyphicon glyphicon-plus-sign" />
              Enable
            </button>
          </p>
          <p className="placeholder4CommandBar" hidden={selectedCount}></p>
          <table id='main-table' className='table'>
            <thead>
              <tr>
                <th colSpan='5'>
                  Recent xptos
                </th>
              </tr>
              <tr>
                <th> Check </th>
                <th> ID </th>
                <th> Number </th>
                <th> Model </th>
                <th> Status </th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
