//Last React Document Project
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProductRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const product = this.props.product;
		const name = product.name;

		return (
			<li className="Product-row">
				<span className={product.stocked ? 'stocked' : 'non_stocked'}>{name} </span>
				{product.price}
			</li>
		);
	}
}

class ProductCategoryRow extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return <p className="product-category-row">{this.props.category}</p>;
	}
}

class ProductTable extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		const filterText = this.props.filterText;
		const inStockOnly = this.props.inStockOnly;
		
		const product_data = this.props.data;
		const rows = [];
		let prev_category = null;

		product_data.forEach((product) => {
			if(product.name.indexOf(filterText)===-1) { //문자열 필터링 검색
				return ;
			}
			if(inStockOnly && !product.stocked) { //재고 체크박스 검색
				return;
			}
			if (product.category !== prev_category) {
				rows.push(
					<ProductCategoryRow category={product.category} key={product.category} />
				);
			}
			rows.push(<ProductRow product={product} key={product.name} />);
			prev_category = product.category;
		});

		return (
			<div className="product-table">
				{console.log(product_data)}
				<b>Name Price</b>
				<ul>{rows}</ul>
			</div>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}
	
	handleFilterTextChange(e){
		this.props.onFilterTextChange(e.target.value);
	}
	
	handleInStockChange(e) {
		this.props.onInStockChange(e.target.value);
	}
	
	render() {
		const filterText = this.props.filterText;
		const inStockOnly = this.props.inStockOnly;
		
		return (
			<div className="search-bar">
				<form>
					<input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextChange} />
					<p>
						<input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockChange} /> Only show products in stock
					</p>
				</form>
			</div>
		);
	}
}

class FilterableProductTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			inStockOnly: false,
		};
		
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}
	
	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	}
	
	handleInStockChange(inStockOnly) {
		this.setState({
			inStockOnly: inStockOnly
		});
	}

	render() {
		return (
			<div className="wrap">
				<SearchBar
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					onFilterTextChange={this.handleFilterTextChange}
					onInStockChange={this.handleInStockChange}
				/>
				<ProductTable
					data={this.props.data}
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
				/>
			</div>
		);
	}
}

const data = [
	{ category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
	{ category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
	{ category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
	{ category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
	{ category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
	{ category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

ReactDOM.render(<FilterableProductTable data={data} />, document.getElementById('root'));