import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function FormattedDate(props) {
	return (
		<h2>
			{props.date.getFullYear() +
				'년 ' +
				(props.date.getMonth() + 1) +
				'월 ' +
				props.date.getDate() +
				'일 ' +
				props.date.getHours() +
				'시 ' +
				props.date.getMinutes() +
				'분 ' +
				props.date.getSeconds() +
				'초'}
		</h2>
	);
}

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}

	tick() {
		this.setState({
			date: new Date(),
		});
	}

	componentDidMount() {
		//Timer 설정 / Mounting
		this.timerID = setInterval(() => this.tick(), 1000);
		this.setState({ comments: 'Yoonseok' });
	}

	componentWillMount() {
		//Timer 해제 / Unmounting
		clearInterval(this.timerID);
	}

	render() {
		return (
			<div>
				<h1>Hello, {this.state.comments}</h1>
				<FormattedDate date={this.state.date} />
			</div>
		);
	}
}

function App() {
	return (
		<div>
			<Clock />
			<Clock />
			<Clock />
		</div>
	);
}

// class Wrap extends React.Component {}

ReactDOM.render(<App />, document.getElementById('root'));