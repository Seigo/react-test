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
      xptos: [],
      textAreaValue: ''
    }
  }

  componentDidMount() {
    XptoService.getInitial((xptos) => {
      this.setState({xptos: xptos})
    })
  }

  rowClicked = (index) => {
    let {xptos} = this.state
    xptos[index].checked = !xptos[index].checked
    this.setState({xptos: xptos})
  }

  actOnRows = (objective) => {
    let {xptos} = this.state
    const selectedOnes = xptos
        .filter(s => s.checked)
    XptoService.execute({
      objective: objective,
      xptos: selectedOnes
    }, objective !== 'Find' ? null : (xptosFound) => {
      this.mergeXptos(xptosFound)
    })
  }

  mergeXptos = (xptosFound) => {
    console.log('merging!', xptosFound, this.state.xptos)
    let {xptos} = this.state
    xptosFound.forEach(xpto => {
      xptos = xptos.map(x => {
        if (x.id === xpto.id &&
            x.number === xpto.number &&
            x.model === xpto.model) {
          console.log('Updating', x, xpto.status)
          x.status = xpto.status
        }
        return x
      })
    })
    this.setState({xptos: xptos})
  }

  textAreaChanged = (event) => {
    this.setState({textAreaValue: event.target.value})
  }

  textAreaSubmit = () => {
    console.log('Submitting', this.state.textAreaValue)
  }

  fileChanged = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      this.setState({textAreaValue: reader.result})
    }
    reader.readAsText(file)
  }
  
  render() {
    let {xptos} = this.state;

    const selectedCount = xptos
        .filter(x => x.checked)
        .length

    const tableRows = xptos.map((value, i) => 
        <tr
          key={i}
          onClick={() => this.rowClicked(i)}
        >
          <td className="mdl-cell"> {value.checked ? 'true' : ''} </td>
          <td> {value.id} </td>
          <td> {value.number} </td>
          <td> {value.model} </td>
          <td> {value.status} </td>
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

          {/*<p>*/}
            {/*<div>*/}
              {/*<textarea
                value={this.state.textAreaValue}
                onChange={this.textAreaChanged}
                placeholder='This is free text area'
              ></textarea>*/}
              {/*<br/>*/}
            {/*</div>*/}
            {/*<span>*/}
              {/*<label htmlFor="file-uploader" className="custom-file-uploader">
                  <i className="fa fa-cloud-upload"></i> Custom Upload
              </label>
              <input
                id="file-uploader"
                type='file'
                onChange={this.fileChanged}
              ></input>
              <button
                onClick={this.textAreaSubmit}
              >Submit</button>*/}
            {/*</span>*/}
          {/*</p>*/}


          <table id='main-table' className='table'>
            <thead>
              <tr>
                <th colSpan='4'>
                  <textarea
                    rows='5'
                    cols='75'
                    value={this.state.textAreaValue}
                    onChange={this.textAreaChanged}
                    placeholder='This is free text area'
                  ></textarea>
                </th>
                <th>
                  <label htmlFor="file-uploader" className="custom-file-uploader">
                      <i className="fa fa-cloud-upload"></i> File
                  </label>
                  <br/>
                  <input
                    id="file-uploader"
                    type='file'
                    onChange={this.fileChanged}
                  ></input>
                  <button
                    onClick={this.textAreaSubmit}
                  >TextArea into table</button>
                </th>
              </tr>
              <tr>
                <th colSpan='5'>
                  Recent XPTO Table
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
