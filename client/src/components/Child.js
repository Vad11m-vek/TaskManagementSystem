import React, { Component } from 'react'

class Child extends Component {
	sendData = () => {
		this.props.onReceiveData(this.props);
	}

	render() {
		return (
			<div >
				<div onClick={this.sendData}>{this.props.name}</div>
			</div>
		);
	}
}
export default Child