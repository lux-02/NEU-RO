import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';


function FriendStatus(props) {
	const [isOnline, setIsOnline] = useState(null);
	
	function handleStatusChange(status) {
		setIsOnline(status.isOnline);
	}
	
	useEffect(() => {
		ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
		return()=>{
			chatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
		};
	});
	
	if(isOnline === null) {
		return 'Loading...';
	}
	
	return isOnline ? 'Online': 'Offline';
}


function Example(){
	const [count, setCount] = useState(0);
	
	useEffect(() => {
		document.title = `You Clicked ${count} times`;
	});
	
	return (
		<div>
			<p>You Clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
			Click Me
			</button>
		</div>
	);
}

ReactDOM.render(<FriendStatus />, document.getElementById('root'));