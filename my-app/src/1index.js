import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Say extends React.Component {
	render() {		
		// bg_color = document.getElementById('wrap')
		// bg_color.style.backgroundColor="{this.props.text}"
		return(
			<p>{this.props.text}</p>
		);
	}
}

class Btn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'Black',
		};
	}
	
	render() {
		return (
			<button className="square" onClick={() => this.setState({ value: 'White'})}>
				<Say text = {this.state.value} />
			</button>
		);
	}
}

class Main extends React.Component {
	render() {
		return (
			<div id="wrap">
				<Btn />
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));