import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function UserGreeting(props) {
	return (
		<div className="user_greet flex_contents">
			<Clock name="Yoonseok" />
			<h3>Welcome Back!</h3>
			<Mailbox unreadMessages={mails} />
		</div>
	);
}

function GuestGreeting(props) {
	return (
		<div className="user_greet flex_contents">
			<Clock name="Guest" />
			<h3>Please Sign Up.</h3>
			<span>If you register as a member, you can use the mail service.</span>
			<SignUp/>
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

function ListItem_header(props) {
	return <li><b>{props.index}. id: #{props.id} Title: {props.title} <hr/></b></li>;
}

function ListItem_body(props) {
	return <p>{props.contents}</p>;
}

function Mailbox(props) {
	const unreadMessages = props.unreadMessages;
	const listItems = unreadMessages.map((message, idx) => 
		<div>
			<ListItem_header id={message.id.toString()} index={idx+1} key={message.id.toString()} title={message.title} />
			<ListItem_body key={message.id.toString()} contents={message.content} /><br/>
		</div>
	);

	return (
		<div>
			<div className="message_count">
				<span>Hello!</span>
				{unreadMessages.length > 0 && ( //둘 다 조건이 충족하면 뒤에 코드만 실행
					<span> You have {unreadMessages.length} unread message.</span>
				)}
			</div>
			<ul>{listItems}</ul>
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

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_name: 'Guest',
			select: 'General'
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event){
		const name = event.target.name;
		this.setState({
			[name]:event.target.value
		});
	}
	
	handleSubmit(event){
		alert('Name: ' + this.state.name + "\n" +
			'Select: ' + this.state.select);
		event.preventDefault();
	}
	
	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					<input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
				</label>
				<label>
					<select name="select" value={this.state.select} onChange={this.handleChange}>
						<option select="general">General</option>
						<option select="Enterprise">Enterprise</option>
					</select>
				</label>
				<input type="submit" value="Submit"/>
			</form>
		)
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
						The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
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

//const message = ['R1', 'R2', 'R3', 'R4'];

const mails = [
	{id: 1056, user_id: '한국발명진흥회', title: '기술 전시회 참가 안내', 
	 content: '2022 말레이시아 쿠알라룸푸르 국제 발명, 혁신 기술 전시회'},
	{id: 2465, user_id: 'Netflix', title: '오윤석 님이 시청할 다음 작품은?',
	content: '넷플릭스 최신 등록 콘텐츠 안내: 소년심판, 서른 아홉, 기상청 사람들'},
	{id: 3155, user_id: '네이버', title: '새로운 기기에서 로그인 되었습니다.',
	content: '회원님의 아이디 oys**** 이(가) 새로운 기기(브라우저)에서 로그인 되었습니다.'}
];

//ReactDOM.render(<Mailbox unreadMessages={message} />, document.getElementById('root'));
ReactDOM.render(<LoginControl />, document.getElementById('root'));