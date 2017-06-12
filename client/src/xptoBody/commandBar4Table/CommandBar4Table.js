import React, { Component } from 'react'

export default class CommandBar4Table extends Component {
  render() {
    const showCommandBar = this.props.selectedCount

    return (
      <div>
        <p className="commandBar" hidden={!showCommandBar}>  
          <span> {this.props.selectedCount} selected </span>
          <button className="myBtn" onClick={this.props.cadastrar}>
            <span className="glyphicon glyphicon-plus" />
            Add
          </button>
          <button className="myBtn" onClick={this.props.consultar}>
            <span className="glyphicon glyphicon-search" />
            Find
          </button>
          <button className="myBtn" onClick={this.props.inativar}>
            <span className="myBtn glyphicon glyphicon-trash" />
            Disable
          </button>
          <button className="myBtn" onClick={this.props.reativar}>
            <span className="myBtn glyphicon glyphicon-plus-sign" />
            Enable
          </button>
        </p>
        <p className="placeholder4CommandBar" hidden={showCommandBar}></p>

      </div>
    )
  }
}