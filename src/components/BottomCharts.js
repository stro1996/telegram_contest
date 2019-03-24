import React, { Component } from 'react';
import { getColor } from '../utils/getValue';
import Chart from './Chart';

class BottomCharts extends Component {

  state = {
    update: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { arrayOfItems, width, height } = this.props;
    const { arrayOfItems: newArrayOfItems, height: newHeight, width: newWidth } = nextProps;
    const { update } = this.state;
    let needUpdate = false;
    if (!update) {
      return true;
    }

    if (width !== newWidth || height !== newHeight) {
      return true
    }

    arrayOfItems.forEach((item, index) => {
      if (item !== newArrayOfItems[index]) {
        needUpdate = true;
      }
    });

    return needUpdate;
  }

  componentDidMount() {
    this.setState({ update: true });
  }

  getArrayOfLine = () => {
    const { arrayOfItems, coefficientY, coefficientX, heightWithPadding, minValue, maxValue } = this.props;
    let arrayOfLine = [];
    for (let dataIndex = 0; dataIndex < arrayOfItems.length; dataIndex++) {
      if (arrayOfItems[dataIndex] === null) {
        arrayOfLine.push(null);
        continue;
      }

      arrayOfLine.push(<Chart
        key={dataIndex}
        index={dataIndex + 1}
        color={getColor(4, `y${dataIndex}`)}
        coefficientY={coefficientY}
        coefficientX={coefficientX}
        minValue={minValue}
        maxValue={maxValue}
        heightWithPadding={heightWithPadding}
        name={'BottomCharts'}
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
