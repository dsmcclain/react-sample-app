import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Dice from "./Dice.js";
import RollButton from "./RollButton.js"
import "./DiceBar.css";

class DiceBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roll: 0,
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const rollCount = this.state.roll;
		this.setState({roll: rollCount + 1});
		console.log(rollCount);
	}

	render () {
		return (
			<div className="dice-area">
					<RollButton handleClick={this.handleClick}/>
				<div className="dice-bar">
					<Dice roll={this.state.roll} />
					<Dice roll={this.state.roll} />
					<Dice roll={this.state.roll} />
					<Dice roll={this.state.roll} />
					<Dice roll={this.state.roll} />
				</div>
			</div>
		);
	}
}

export default hot (module)(DiceBar);