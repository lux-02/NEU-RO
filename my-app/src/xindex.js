import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function UserGreeting(props) {
	return (
		<div className="user_greet flex_contents">
			<Clock name="Yoonseok" />
			<h3>Welcome Back!</h3>
			<Mailbox unreadMessages={message} />
		</div>
	);
}

function GuestGreeting(props) {
	return (
		<div className="user_greet flex_contents">
			<Clock name="Guest" />
			<h3>Please Sign Up.</h3>
			<span>If you register as a member, you can use the mail service.</span>
		</div>
	);
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />;
	}
	return <GuestGreeting />;
}

function LoginButton(props) {
	return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
	return <button onClick={props.onClick}>Logout</button>;
}

function Mailbox(props) {
	const unreadMessages = props.unreadMessages;
	return (
		<div>
			<span>Hello!</span>
			{unreadMessages.length > 0 && ( //둘 다 조건이 충족하면 뒤에 코드만 실행
				<span> You have {unreadMessages.length} unread message.</span>
			)}
		</div>
	);
}

function WarningBanner(props) {
	if (!props.warn) {
		return null;
	}

	return <div className="warning">Warning!</div>;
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		return (
			<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning ? 'Hide' : 'Show'}
				</button>
			</div>
		);
	}
}

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
		this.setState({ name: this.props.name });
	}

	componentWillMount() {
		//Timer 해제 / Unmounting
		clearInterval(this.timerID);
	}

	render() {
		return (
			<div className="clock_area">
				<h1>Hello, {this.state.name}</h1>
				<FormattedDate date={this.state.date} />
			</div>
		);
	}
}

class LoginControl extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = { isLoggedIn: false };
	}

	handleLoginClick() {
		this.setState({ isLoggedIn: true });
	}

	handleLogoutClick() {
		this.setState({ isLoggedIn: false });
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;

		return (
			<div className="wrap">
				<div className="user_info flex_contents">
					<span>
						The user is <b>{isLoggedIn ? 'currency' : 'not'}</b> logged in.
					</span>
				</div>
				<Greeting isLoggedIn={isLoggedIn} />
				<div className="user_btn flex_contents">
					{isLoggedIn ? (
						<LogoutButton onClick={this.handleLogoutClick} />
					) : (
						<LoginButton onClick={this.handleLoginClick} />
					)}
				</div>
			</div>
		);
	}
}

const message = ['React', 'Re: React', 'Re:Re:React', 'ssssss'];

//ReactDOM.render(<Mailbox unreadMessages={message} />, document.getElementById('root'));
ReactDOM.render(<LoginControl />, document.getElementById('root'));