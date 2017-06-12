import React, { Component } from 'react'
import './XptoBody.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import XptoService from '../XptoService'
import XptoDashboard from './xptoDashboard/XptoDashboard'
import SearchBar from './searchBar/SearchBar'
import CommandBar4Table from './commandBar4Table/CommandBar4Table'
import MainTable from './mainTable/MainTable'

class XptoBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xptos: [],
      tableFilterText: ''
    }
    this.clearTableButtonClicked = 
        this.clearTableButtonClicked.bind(this)
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
    console.log('Acting on ' + objective)
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

  dashboardFileUploaded = (contents) => {
    console.log('Importing XptoDashboardFileUpload contents into table: ', contents)
    this.setState({ xptos: JSON.parse(contents) })
  }

  searchBarChanged = (contents) => {
    this.setState({tableFilterText: contents})
  }

  clearTableButtonClicked() {
    this.setState({xptos: []})
  }

  render() {
    let {xptos, tableFilterText} = this.state;
    xptos = xptos.filter(x => {
      return ('' + x.id + x.number + x.model + x.status)
          .toLowerCase()
          .indexOf(
              tableFilterText.toLowerCase()
          ) !== -1
    })

    const selectedCount = xptos
        .filter(x => x.checked)
        .length

    return (
      <div className="Xpto-body">
        <XptoDashboard
            fileUploaded={this.dashboardFileUploaded}
            ativos={43209}
            inativos={22408}
        />

        <SearchBar onChange={this.searchBarChanged} />
        <button onClick={this.clearTableButtonClicked}>Clear</button>

        <CommandBar4Table
            selectedCount={selectedCount}
            cadastrar={() => this.actOnRows('cadastrar')}
            consultar={() => this.actOnRows('consultar')}
            inativar={() => this.actOnRows('inativar')}
            reativar={() => this.actOnRows('reativar')}
        />

        <MainTable
            xptos={xptos}
            rowClicked={this.rowClicked}
        />

        {/*<OldiesTable xptos={this.state.xptos} rowClicked={this.tableRowClicked}*/}

      </div>
    )
  }
}

export default XptoBody