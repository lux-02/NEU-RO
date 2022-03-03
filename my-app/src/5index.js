import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: 'Write your name',
					  essay: 'Please write an essay about your favorite DOM element.', 
					  select: "Coconut"};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const name = event.target.name;
		this.setState({
			[name]:event.target.value
		});
	}
	
	handleSubmit(event) {
		alert('Name: ' + this.state.name + "\n" +
			'Essay: ' + this.state.essay + "\n" +
			'Select: ' + this.state.select);
		event.preventDefault();
	}
	
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					name:
					<input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
				</label>
				<label>
					Essay:
					<textarea type="textarea" name="essay"  value={this.state.essay} onChange={this.handleChange}/>
					</label>
				<label>
					Pick your favorite flavor:
					<select name="select" value={this.state.select} onChange={this.handleChange}>
						<option select="grapefruite">Grapefruite</option>
						<option select="lime">Lime</option>
						<option select="coconut">Coconut</option>
						<option select="mango">Mango</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}

class Reservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};
		
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		
		this.setState({
			[name]: value
		});
	}
	
	render() {
		return (
			<form>
				<label>
					Is going: 
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					Number of guests:
					<input 
						name="numberOfGuests"
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleInputChange} />
				</label>
			</form>
		);
	}
}


ReactDOM.render(<NameForm/>, document.getElementById('root'));