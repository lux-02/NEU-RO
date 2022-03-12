import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';

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
					<a className="clist_alink" target="_blank" href={contents.url}>
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

const non_img =
	'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80';

const category_list = ['IT', 'Trends', 'UI/UX', 'Culture'];

const upload_list = ['매일', '매월', '수시'];

const contents_list = [
	{
		field: 'IT',
		title: 'ZDNET KOREA',
		img: 'https://zdnet.co.kr/images/footer_logo.png',
		upload: '매일',
		url: 'http://www.zdnet.co.kr/',
		contents: '국내 IT전문 언론사 중 가장 폭 넒은 범위의 기사를 제공',
	},
	{
		field: 'IT',
		title: 'ITWORLD KOREA',
		img: 'https://www.itworld.co.kr/_images/common/logo-itw.svg',
		upload: '매일',
		url: 'http://www.itworld.co.kr',
		contents:
			' IDG사에서 운영하는 IT 언론. 해외 기사를 번역해 제공. 뉴스보다는 칼럼, 아티클, 리포트, 리뷰 등이 많음',
	},
	{
		field: 'IT',
		title: 'CIO KOREA',
		img: 'https://www.ciokorea.com/_images/common/logo-cio.svg',
		upload: '매일',
		url: 'http://www.ciokorea.com',
		contents:
			'ITWorld와 같이 IDG사에서 운영하는 언론사. 관리자 급을 타깃으로 한 내용이 주를 이름',
	},
	{
		field: 'IT',
		title: 'VIEWS LETTER',
		img: 'https://bit.ly/3sRWdt7',
		upload: '매일',
		url: 'https://themiilk.com/',
		contents: '미국 실리콘밸리 현장의 소식 및 인사이트 등	',
	},
	{
		field: 'IT',
		title: 'BLOTER',
		img:
			'https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/118424228_3807028145980697_7355663210502523866_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=e3f864&_nc_ohc=xwuiWDiDa-oAX8fZflz&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-2H6sam28FTP6hecnnWY_ob0VhGG6p06vjP144SSpzSw&oe=624E69FA',
		upload: '매일',
		url: 'http://www.bloter.net/',
		contents:
			'ZDNet Korea보다 정보의 양은 적지만 선별된 이슈 및 트렌드에 대한 심도 깊은 기사를 제공',
	},
	{
		field: 'IT',
		title: 'BYLINE NETWORK',
		img:
			'https://yt3.ggpht.com/WArkdlAhJ-WrRsiBfs8n3evaNKhOnR8ioRaQ0aElm5SekROCPi-teEtodf4a6E1_mAHKCqeioQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
		upload: '매일',
		url: 'https://byline.network/',
		contents:
			"블로터보다 더 적은 양의 기사이지만 더 심도 깊은 이슈 분석 기사를 제공. 스타트업, 유통 소식이 많음 (팟캐스트 'IT TMI'도 운영 중)",
	},
	{
		field: 'IT',
		title: 'TECHWORLD',
		img: 'https://cdn.epnc.co.kr/image/logo/watermark_20210111114848.png',
		upload: '매월',
		url: 'http://www.epnc.co.kr/',
		contents: '소재, 솔루션 등에 대한 인더스트리 관련 정보가 많음',
	},
	{
		field: 'IT',
		title: 'TECHNEEDLE',
		img:
			'https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/31947193_1517493948357146_5727339271468089344_n.png?_nc_cat=105&ccb=1-5&_nc_sid=e3f864&_nc_ohc=UFsNfIadw0oAX8g9Vz-&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-D7u0WYA-5lWaEPhd8ShgphP_bYgMzYY2sFjvNYPI7Fw&oe=624D3AB9',
		upload: '수시',
		url: 'http://techneedle.com/',
		contents: '주로 실리콘밸리에서 근무 또는 거주하는 IT업 종사자의 칼럼 형식 기사를 제공',
	},
	{
		field: 'IT',
		title: 'MOBIINSIDE',
		img: non_img,
		upload: '매월',
		url: 'https://www.mobiinside.com/kr/',
		contents: '주로 스타트업, 벤처캐피탈 전반의 소식을 제공',
	},
	{
		field: 'IT1',
		title: 'PLATUM',
		img: 'https://platum.kr/wp-content/uploads/2016/11/logo-2.png',
		upload: '매월',
		url: 'https://platum.kr/',
		contents: '스타트업 소식 전문 언론',
	},
	{
		field: 'IT2',
		title: 'STARTUP WEEKLY',
		img: non_img,
		upload: '매월',
		url: 'http://www.startupweekly.net/news',
		contents:
			'엑싯/투자, 성과/지표, 출시/업데이트, 정책/지원, 업계 동향, 해외 뉴스, 행사/모임 카테고리 별 핵심 기사 리스트를 제공',
	},
];

ReactDOM.render(<Wrap />, document.getElementById('root'));