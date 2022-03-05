import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';

//Background Color Flipper

class InputBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
	}
	
	handleBackgroundChange(e) {
		this.props.onBackgroundChange(e.target.value);
	}

	render() {
		return (
			<div className="input_bar">
				<p className="text_area">
					Enter Color: <input placeholder="color..." type="text" value={this.props.bg_color} onChange={this.handleBackgroundChange} />
				</p>
			</div>
		);
	}
}

class InputArea extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="input_area flex">
				<InputBar bg_color={this.props.bg_color} onBackgroundChange={this.props.onBackgroundChange} />
			</div>
		);
	}
}

class CurrentArea extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="current_area flex">
				<p className="text_area ellipsis">Current Color: {this.props.bg_color} </p>
			</div>
		);
	}
}

class Wrap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bgcolor: '',
		};

		this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
	}

	handleBackgroundChange(background) {
		this.setState({
			bgcolor: background,
		});
	}

	render() {
		let bg = this.state.bgcolor;

		return (
			<div className="wrap" style={{ background: bg}}>
				{console.log(bg)}
				<CurrentArea bg_color={this.state.bgcolor} />
				<InputArea bg_color={bg} onBackgroundChange={this.handleBackgroundChange}/>
			</div>
		);
	}
}

ReactDOM.render(<Wrap />, document.getElementById('root'));