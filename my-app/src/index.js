import React from 'react';
import ReactDOM from 'react-dom';
import {category_list, upload_list, contents_list} from './data.js';
import './reset.css';
import './index.css';


class ContentsUpload extends React.Component {
	render() {
		return <div className="contents_upload flex">{this.props.upload}</div>;
	}
}

class ContentsTitle extends React.Component {
	render() {
		return <div className="contents_title flex">{this.props.title}</div>;
	}
}

class ContentsBottom extends React.Component {
	render() {
		return (
			<div className="contents_bottom flex ">
				<ContentsUpload upload={this.props.upload} />
				<ContentsTitle title={this.props.title} />
			</div>
		);
	}
}

class ContentsArticle extends React.Component {
	render() {
		return (
			<div className="contents_article flex">
				<img src={this.props.img} alt={this.props.alt} />
				<div className="contents_section flex">
					<p>{this.props.con}</p>
				</div>
			</div>
		);
	}
}

class ContentsItem extends React.Component {
	render() {
		return (
			<div className="contents_items flex">
				<ContentsArticle con={this.props.con} img={this.props.img} alt={this.props.title} />
				<ContentsBottom upload={this.props.upload} title={this.props.title} />
			</div>
		);
	}
}

class Plus extends React.Component {
	constructor(props) {
		super(props);
		this.handleContentsInput = this.handleContentsInput.bind(this);
	}

	handleContentsInput(e) {
		console.log(e);
	}

	render() {
		return (
			<div className="plus_contents flex">
				<button onClick={this.handleContentsInput}>Update</button>
			</div>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearchTitle = this.handleSearchTitle.bind(this);
	}

	handleSearchTitle(e) {
		this.props.onSearch(e.target.value.toUpperCase());
	}

	render() {
		return (
			<div className="search_bar flex">
				<input
					type="text"
					placeholder="Search..."
					value={this.props.search}
					onChange={this.handleSearchTitle}
				/>
			</div>
		);
	}
}

class Logo extends React.Component {
	render() {
		return (
			<div className="logo flex">
				<p>NEU/RO</p>
			</div>
		);
	}
}

class AllCategory extends React.Component {
	render() {
		return (
			<div className="contents_filterCategory">
				<button>ALL</button>
			</div>
		);
	}
}

class ContentsFilterCategory extends React.Component {
	constructor(props) {
		super(props);
		this.handleCheckCategory = this.handleCheckCategory.bind(this);
	}

	handleCheckCategory(e) {
		this.props.onCheckCategory(e.target.value);
	}

	render() {
		return (
			<div className="contents_filterCategory flex">
				<label>
					<input
						type="checkbox"
						checked={this.props.checked}
						onChange={this.handleCheckCategory}
						name="category"
						category={this.props.category}
					/>
					{this.props.category}
				</label>
			</div>
		);
	}
}

class ContentsFilterArea extends React.Component {
	render() {
		const clist = this.props.clist;
		const ulist = this.props.ulist;
		const clist_items = clist.map((category) => (
			<ContentsFilterCategory onCheckCategory={this.props.onCheckCategory} key={category} category={category} />
		));
		const ulist_items = ulist.map((upload) => (
			<ContentsFilterCategory key={upload} category={upload} />
		));
		return (
			<div className="contents_filter_area flex">
				<AllCategory />
				{clist_items}
				{ulist_items}
			</div>
		);
	}
}

class ContentsCnt extends React.Component {
	render() {
		return (
			<div className="contents_cnt flex">
				<p>당신을 위한 {this.props.cnt}개의 뉴스레터를 만나보세요.</p>
			</div>
		);
	}
}

class Contents extends React.Component {
	render() {
		const filterText = this.props.search;
		const rows = [];
		const clist = this.props.list;

		clist.forEach((contents) => {
			if (contents.title.indexOf(filterText) === -1) {
				return;
			}
			rows.push(
				<div className="clist">
					<a className="clist_alink" target="_blank" rel="noopener noreferrer" href={contents.url}>
						<ContentsItem
							img={contents.img}
							contents={contents.contents}
							title={contents.title.toUpperCase()}
							key={contents.title.toUpperCase()}
							field={contents.field}
							con={contents.contents}
							upload={contents.upload}
						/>
					</a>
				</div>
			);
		});
		return (
			<div className="contents_area flex">
				{console.log(rows)}
				{rows}
			</div>
		);
	}
}

class Header extends React.Component {
	render() {
		return (
			<div className="header_area flex">
				{this.props.cnt}
				<Logo />
				<SearchBar search={this.props.search} onSearch={this.props.onSearch} />
				<Plus />
			</div>
		);
	}
}

class Wrap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			checked: []
		};
		this.handleSearchTitle = this.handleSearchTitle.bind(this);
		this.handleCheckCategory = this.handleCheckCategory.bind(this);
	}

	handleSearchTitle(keyword) {
		this.setState({
			search: keyword,
		});
	}

	handleCheckCategory(checked) {
		this.setState({
			checked: [checked]
		});
	}
	
	render() {
		const filterBox = document.querySelectorAll('input[name="category"]:checked').category;
		return (
			<div className="wrap flex">
				{console.log(this.state.search)}
				{console.log(filterBox)}
				<Header search={this.state.search} onSearch={this.handleSearchTitle} />
				<ContentsCnt cnt={contents_list.length} />
				<ContentsFilterArea onCheckCategory={this.handleCheckCategory} clist={category_list} ulist={upload_list} />
				<Contents list={contents_list} search={this.state.search} />
			</div>
		);
	}
}

// 임시 데이터 영역


ReactDOM.render(<Wrap />, document.getElementById('root'));