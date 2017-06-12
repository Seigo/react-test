import React, { Component } from 'react'

export default class SearchBar extends Component {
  onChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <div>
        <input onChange={this.onChange} placeholder='Filter text'/>
        <span className="glyphicon glyphicon-search" />
      </div>
    )
  }
}