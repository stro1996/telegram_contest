import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Field from './components/Field';
import BottomCharts from './components/BottomCharts';
import Resizer from './components/Resizeble';
import Charts from './components/Charts';
import { workHeightCoefficient } from './const/constForСalculations';
import {
  getCoefficientYForBottomBar,
  getCoefficientX,
  getValueAndCoefficientYForChart,
  getCoefficientXForCharts,
} from './utils/getCoefficient';
import { getValueXOfRange } from './utils/getValueOfRange';
import { rangeForBottomBar } from "./const/constForСalculations";

const checkArr = [0, 1, 2, 3];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 200,
      coefficientY: 1,
      limiter: {
        x: 100,
        y: 50,
        width: 100,
        height: 150,
        isResizing: false,
      },
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    const coefficientY = getCoefficientYForBottomBar(checkArr, rangeForBottomBar);
    this.setState({ coefficientY });
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updateStateResizing = (isResizing) => {
    const newLimiter = {
      ...this.state.limiter,
      isResizing: isResizing,
    };

    this.setState({ limiter: newLimiter });
  };

  funcResizing = (clientX, clientY) => {
    const newLimiter = { ...this.state.limiter };
    const node = ReactDOM.findDOMNode(this.refs['limiter']);
    newLimiter.width = clientX - node.offsetLeft + (16 / 2);

    this.setState({
      limiter: newLimiter,
    });
  };

  render() {

    const { width, height, limiter, coefficientY } = this.state;
    const heightWithPaddingForCharts = (height * workHeightCoefficient);
    const { coefficientX, stepOfValueX, minValue, maxValue } = getCoefficientX(checkArr, width);
    const { minValueXOfRange, maxValueXOfRange } = getValueXOfRange(coefficientX - coefficientX/* change for start position minus cofficent*/, limiter.width, minValue, stepOfValueX, coefficientX);
    const { coefficient: coefficientForCharts, maxValue: maxValueForCharts } = getValueAndCoefficientYForChart(checkArr, minValueXOfRange, maxValueXOfRange, heightWithPaddingForCharts);
    const coefficientXForCharts = getCoefficientXForCharts(width, coefficientX - coefficientX/* change for start position minus cofficent*/, limiter.width, coefficientX);

    const heightWithPaddingForBottomBar = heightWithPaddingForCharts + 150;

    return (
      <div className="App" style={{position: 'relative'}}>
        <Field
          maxValue={maxValueForCharts}
          width={width}
          heightGap={heightWithPaddingForCharts / 6}
        />
        <BottomCharts
          coefficientY={coefficientY}
          coefficientX={coefficientX}
          arrayOfItems={checkArr}
          minValue={minValue}
          maxValue={maxValue}
          width={width}
          heightWithPadding={heightWithPaddingForBottomBar}
        />
        <Charts
          coefficientY={coefficientForCharts}
          coefficientX={coefficientXForCharts}
          arrayOfItems={checkArr}
          minValue={minValueXOfRange}
          maxValue={maxValueXOfRange}
          width={width}
          heightWithPadding={heightWithPaddingForCharts}
          isCharts={true}
        />
        <Resizer
          ref={"limiter"}
          isResizing={limiter.isResizing}
          resizerWidth={limiter.width}
          resizerHeight={limiter.height}
          updateStateResizing={this.updateStateResizing}
          funcResizing={this.funcResizing}
          defaultX={coefficientX}
        />
      </div>
    );
  }
}

export default App;
