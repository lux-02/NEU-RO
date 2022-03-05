import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function FancyBorder(props) {
	return <div className={'FancyBorder FancyBorder-' + props.color}>{props.children}</div>; //prop.children으로 내용 표시
}

function Dialog(props){
	return(
		<FancyBorder color="blue">
			<h1 className="Dialog-title">
				{props.title}
			</h1>
			<p className="Dialog-message">
				{props.message}
			</p>
			{props.children}
		</FancyBorder>
	);
}

class SignUpDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.state = {login: ' '};
	}
	
	render(){
		return(
			<Dialog title="Mars Exploration Program" message="How should we refer to you?">
				<input type="text" value={this.state.login} onChage={this.handleChange} />
				<button onClick={this.handleSignUp}>Sign Me Up!</button>
			</Dialog>
		);
	}
	
	handleChange(e) {
		this.setState({login: e.target.value});
	}
	
	handleSignUp(){
		alert(`Welcome aboard, ${this.state.login}!`);
	}
}

function WelcomeDialog() {
	return (
		<Dialog title="Welcome" message="Thank you for visiting our spacecraft" />
	);
}

function Contacts(){
	return <div className="Contacts" />;
}

function Chat(){
	return <div className="Chat" />;
}

function SplitPane(props){
	return (
		<div className="splitPane">
			<div className="splitPane-left">
				{props.left}
			</div>
			<div className="SplitPane-right">
				{props.right}
			</div>
		</div>
	);
}

function App(){
	return(
		<SplitPane left={<Contacts />} right={<Chat />}/>
	);
}

ReactDOM.render(<SignUpDialog />, document.getElementById('root'));