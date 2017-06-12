import React, { Component } from 'react'

export default class MainTable extends Component {
  render() {

    const tableRows = this.props.xptos.map((value, i) => 
        <tr key={i} onClick={() => this.props.rowClicked(i)} >
          <td> {value.checked ? 'true' : ''} </td>
          <td> {value.id} </td>
          <td> {value.number} </td>
          <td> {value.model} </td>
          <td> {value.status} </td>
        </tr>
    )

    return (
      <table id='main-table' className='table'>
        <thead>
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
    )
  }
}