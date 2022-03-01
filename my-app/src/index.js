import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>);

	return <ul>{listItems}</ul>;
}


function TodoList(props){
	const todos = props.todos;
	const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
	return <ul>{todoItems}</ul>;
}


const numbers = [1, 2, 3, 4, 5];

const todos = [
	1, 2, 3
];


ReactDOM.render(
	<ul>
		<NumberList numbers={numbers} />
		<todoItems todos={todos} />
	</ul>,
	document.getElementById('root')
);