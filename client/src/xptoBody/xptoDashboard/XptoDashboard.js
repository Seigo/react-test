import React, { Component } from 'react'
import './XptoDashboard.css'

class XptoDashboard extends Component {
    constructor(props) {
        super(props)
    }

    fileChanged = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            this.props.fileUploaded(reader.result)
            document.getElementById('file-uploader').value = ''
        }
        reader.readAsText(file)
    }

    render() {
        return (
            <div>
                <input id="file-uploader" type='file' onChange={this.fileChanged}></input>
                <label htmlFor="file-uploader" className="xpto-dashboard-tile xpto-dashboard-actionable-tile">
                    <i className="fa fa-cloud-upload"></i> File
                </label>
                <div className='xpto-dashboard-tile'>{this.props.ativos} ativos</div>
                <div className='xpto-dashboard-tile'>{this.props.inativos} inativos</div>
            </div>
        )
    }
}

export default XptoDashboard