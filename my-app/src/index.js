import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function UserGreeting(props) {
	return (
		<div className="user_greet flex_contents">
			<h1>Welcome Back!</h1>
			<Mailbox unreadMessages={message} />
		</div>
	);
}

function GuestGreeting(props) {
	return (
		<div className="user_greet flex_contents">
			<h1>Please Sign Up.</h1>
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
			<b>
				<span>Hello!</span>
				{unreadMessages.length > 0 && ( //둘 다 조건이 충족하면 뒤에 코드만 실행
					<span> You have {unreadMessages.length} unread message.</span>
				)}
			</b>
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
					<span>The user is <b>{isLoggedIn ? 'currency' : 'not'}</b> logged in.</span>
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