import React, { Component } from 'react';
import Chart from "./Chart";
import { getValue } from "../utils/getValue";

class Charts extends Component {

  getArrayOfLine = () => {
    const { arrayOfItems, coefficientY, coefficientX, height, minValue, maxValue, heightWithPadding } = this.props;
    let arrayOfLine = [];
    for (let dataIndex = 0; dataIndex < arrayOfItems.length; dataIndex++) {
      if (arrayOfItems[dataIndex] === null) {
        arrayOfLine.push(null);
        continue;
      }

      const firstValue = getValue(dataIndex, 0, 1);
      if (firstValue > maxValue) {
        continue;
      }

      arrayOfLine.push(<Chart
        key={dataIndex}
        height={height}
        index={dataIndex}
        color={'blue'}
        coefficientY={coefficientY}
        coefficientX={coefficientX}
        minValue={minValue}
        maxValue={maxValue}
        heightWithPadding={heightWithPadding}
      />);
    }

    return arrayOfLine;
  };



  render() {
    return (
      <React.Fragment>
        {this.getArrayOfLine()}
      </React.Fragment>
    );
  }
}

export default Charts;
