import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';

//Background Color Flipper

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    // if (hex.length !== 6) {
    //     throw new Error('Invalid HEX color.');
    // }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
	
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    
	// invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
	
	const result = "#" + r + g + b;
	
	console.log("text=: ", result.toString());
	
    return result.toString();
}



class InputBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
	}
	
	handleBackgroundChange(e) {
		this.props.onBackgroundChange(e.target.value);
	}

	render() {
		const text_area = 
			<p className="text_area">
				Enter Color: <input placeholder="keyword, rgb, hsl..." type="text" value={this.props.bg_color} onChange={this.handleBackgroundChange} />
			</p>;
		
		const picker_area =
			  <p className="picker_area">
			  	Picker Color: <input type="color" value={this.props.bg_color} onChange={this.handleBackgroundChange}></input>
			  </p>
		
			  
		const choice_area = this.props.choice ? text_area : picker_area
		
		return (
			<div className="input_bar">
				{choice_area}
			</div>
		);
	}
}

class TapPanel extends React.Component {
	constructor(props) {
		super(props);
		this.handleTabChange = this.handleTabChange.bind(this);
	}
	
	handleTabChange() {
		this.props.onTabChange();
	}
	
	render(){
		return(
			<div className="tab_panel flex">
				<div className="input_tab flex">
					<InputBar choice={this.props.choice} bg_color={this.props.bg_color} onBackgroundChange={this.props.onBackgroundChange} />
				</div>
				<div className="btn_tab flex">
					<button onClick={this.handleTabChange}>How about the {this.props.choice ? 'Picker' : 'Text'}?</button>
				</div>
			</div>
		);
	}
}

class InputArea extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="input_area flex">
				<TapPanel onTabChange={this.props.onTabChange} choice={this.props.choice} bg_color={this.props.bg_color} onBackgroundChange={this.props.onBackgroundChange} />
			</div>
		);
	}
}

class CurrentArea extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="current_area flex">
				<p className="text_area ellipsis">Current Color: {this.props.bg_color} </p>
			</div>
		);
	}
}

class Wrap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bgcolor: '',
			textcolor: '',
			choice: true
		};
		this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
		this.handleTabChange = this.handleTabChange.bind(this);
	}

	handleBackgroundChange(background) {
		this.setState({
			bgcolor: background,
			textcolor: invertColor(background),
		});
	}
	
	handleTabChange(){
		this.setState(prevState => ({
			choice: !prevState.choice
		}));
	}

	render() {
		//let textcolor = this.state.textcolor.toString();
		return (
			<div className="wrap" style={{background: this.state.bgcolor, color:this.state.textcolor}}>
				{console.log(this.state.bgcolor)}
				<CurrentArea bg_color={this.state.bgcolor} />
				<InputArea  choice={this.state.choice} bg_color={this.state.bgcolor} onTabChange={this.handleTabChange} onBackgroundChange={this.handleBackgroundChange}/>
			</div>
		);
	}
}

ReactDOM.render(<Wrap />, document.getElementById('root'));