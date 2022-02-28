import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Form extends React.Component { //submit default action 방지
	handleSubmit = (e) => {
		e.preventDefault();
		console.log('You clicked submit.');
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

class Toggle extends React.Component {
	//Toggle State Change
	constructor(props) {
		super(props);
		this.state = { isToggleOn: true };
		this.handleClick = this.handleClick.bind(this); //Callback Binding
	}

	handleClick() {
		this.setState((prevState) => ({
			isToggleOn: !prevState.isToggleOn,
		}));
	}

	render() {
		return <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>;
	}
}

class LoggingButton extends React.Component {
	handleClick = () => {
		console.log('this is:', this);
	};

	render() {
		return <button onClick={this.handleClick}>Click me</button>;
	}
}

class Main extends React.Component {
	render() {
		return (
			<div>
				<Form />
				<Toggle />
				<LoggingButton />
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));