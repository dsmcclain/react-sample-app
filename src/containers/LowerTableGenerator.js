import React, { Component } from "react";
import {hot} from "react-hot-loader";
import LowerSums from "../components/LowerSums.js";
import Cell from "../components/Cell.js";

class LowerTableGenerator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: [false, false, false, false, false, false, false],
      total: [0,0,0,0,0,0,0],
      filled: [false, false, false, false, false, false, false],
      score: [0,0,0,0,0,0,0],
    }
    this.toggleCell = this.toggleCell.bind(this)
  }

  toggleCell(id) {
    let fills = this.state.filled;
    let scores = this.state.score;
    !this.state.filled[id] && 
      (fills[id] = true, 
        scores[id] = this.state.total[id])
    this.setState ({
      filled: fills,
      score: scores
    })
  }

  // triggered when dice change
  componentDidUpdate(prevProps) {
    if (this.props.pips !== prevProps.pips) {
      this.checkDice(this.props.pips)
    }
  }

  checkDice(pips) {
    let newActive = [...this.state.active]
    let newTotal = [...this.state.total]
    let diceObject = {}
    let diceSum = 0

    // Extract pips array into an object where keys represent 
    // dice faces and values represent the number of times 
    // each face is showing. Keys are sorted in ascending order.
    pips.forEach(dice => {
      diceObject[dice] = (diceObject[dice] || 0)+1
      diceSum = diceSum + dice + 1 
    })

    let pair = Object.values(diceObject).includes(2)
    let triple = Object.values(diceObject).includes(3)
    let quadruple = Object.values(diceObject).includes(4)
    let yahtzee = Object.values(diceObject).includes(5)

    let faces = Object.keys(diceObject)

    let fiveConsecutive = 
      (faces.length === 5 && faces[4] - faces[0] === 4)

    let fourConsecutive =
      ((faces.length === 5 && 
        (faces[4] - faces[1] === 3 || faces[3] - faces[0] === 3)) ||
        (faces.length === 4 && faces[3] - faces[0] === 3))
    /*
    triple && (newActive[0] = true)
    quadruple && (newActive[0] = true, newActive[1] = true)
    yahtzee && (newActive[0] = true, newActive[1] = true, newActive[5] = true)
    (triple && pair) && (newActive[2] = true )
    fourConsecutive && (newActive[3] = true)
    fiveConsecutive && (newActive[4] = true)
    */
    newActive[0] = triple || quadruple || yahtzee
    newActive[1] = quadruple || yahtzee
    newActive[2] = triple && pair
    newActive[3] = fourConsecutive
    newActive[4] = fiveConsecutive
    newActive[5] = yahtzee
    newActive[6] = (this.props.roll === 3)

    newActive[0] ? (newTotal[0] = diceSum) : (newTotal[0] = 0)
    newActive[1] ? (newTotal[0] = diceSum) : (newTotal[1] = 0)
    newActive[2] ? (newTotal[2] = 25) : (newTotal[2] = 0)
    newActive[3] ? (newTotal[3] = 30) : (newTotal[3] = 0)
    newActive[4] ? (newTotal[4] = 40) : (newTotal[4] = 0)
    newActive[5] ? (newTotal[5] = 50) : (newTotal[5] = 0)
    newActive[6] ? (newTotal[6] = diceSum) : (newTotal[6] = 0)

    this.setState((state) => ({ active: newActive }))
		this.setState((state) => ({ total: newTotal }))
  }

  render() {
    const lowerRows = []
    this.props.items.forEach((item, index) => {
      lowerRows.push(
      <tr>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <Cell id={index}
              active={this.state.active[index]}
              suggestion={this.state.total[index]}
              filled={this.state.filled[index]}
              score={this.state.score[index]}
              toggleCell={this.toggleCell} />
      </tr>
      )
    })

    return (
      <>
      {lowerRows}
      <LowerSums filled={this.state.filled}
                 score={this.state.score}
                 upperFills={this.props.upperFills}
                 upperScores={this.props.upperScores} />
      </>
    )
  }
}
  
export default hot (module)(LowerTableGenerator);