import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// parseFloat=> 문자열->실수 변환

class Calculator extends React.Component {	
	render(){
		return (
			<div>
				<TemperatureInput scale="c" />
				<TemperatureInput scale="f" />
			</div>
		);
	}
}

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {temperature: ''};
	}
	
	handleChange(e) {
		this.setState({temperature: e.target.value});
	}
	
	render() {
		const temperature = this.state.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature}
					onChange={this.handleChange} />
			</fieldset>
		);
	}
}

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius){
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if(Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

ReactDOM.render(<Calculator />, document.getElementById('root'));