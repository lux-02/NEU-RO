import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';


class ContentsIndex extends React.Component {
	render() {
		return <div className="contents_index flex">idx</div>;
	}
}

class ContentsTitle extends React.Component {
	render() {
		return <div className="contents_title flex">Title</div>;
	}
}

class ContentsArticle extends React.Component {
	render() {
		return <div className="contents_article flex">article</div>;
	}
}

class ContentsItem extends React.Component {
	render() {
		return(
			<div className="contents_items flex">
				<ContentsArticle/>
				<div className="contents_bottom flex">
					<ContentsIndex/>
					<ContentsTitle/>
				</div>
			</div>
		);
	}
}

class Plus extends React.Component {
	render(){
		return(
			<div className="plus_contents">
				<button>Update</button>
			</div>
		)
	}
}

class SearchBar extends React.Component {
	render() {
		return (
			<div className="search_bar flex">
				<p>
					Search: <input type="text" placeholder="Contents..." />
				</p>
			</div>
		);
	}
}

class Logo extends React.Component {
	render(){
		return(
			<div className="logo flex">
				<p><b>TODO</b></p>
			</div>
		)
	}
}

class Contents extends React.Component {
	render() {
		return (
			<div className="contents_area flex">
				<a href="#" alert="#"><ContentsItem /></a>
				<ContentsItem />
				<ContentsItem />
				<ContentsItem />
				<ContentsItem />
				<ContentsItem />
				<ContentsItem />
				<ContentsItem />
			</div>
		);
	}
}

class Header extends React.Component {
	render() {
		return (
			<div className="header_area flex">
				<Logo/>
				<SearchBar />
				<Plus />
			</div>
		);
	}
}

class Wrap extends React.Component {
	render() {
		return (
			<div className="wrap flex">
				<Header />
				<Contents />
			</div>
		);
	}
}

ReactDOM.render(<Wrap />, document.getElementById('root'));