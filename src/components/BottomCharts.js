import React, { Component } from 'react';
import Chart from './Chart';

class BottomCharts extends Component {
  getArrayOfLine = () => {
    const { arrayOfItems, coefficientY, coefficientX, height } = this.props;
    let arrayOfLine = [];

    for (let dataIndex = 0; dataIndex < arrayOfItems.length; dataIndex++) {
      if (!arrayOfItems[dataIndex]) {
        arrayOfLine.push(null);
        continue;
      }

      arrayOfLine.push(<Chart
        key={dataIndex}
        height={height}
        index={dataIndex}
        color={'blue'}
        coefficientY={coefficientY}
        coefficientX={coefficientX}
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
  };
}

export default BottomCharts;
