import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Field from './components/Field';
import BottomCharts from './components/BottomCharts';
import Resizer from './components/Resizeble';
import { workHeightCoefficient } from './const/constForСalculations';
import { getCoefficientY, getCoefficientX } from './utils/getCoefficient';
import { getValueOfRange } from './utils/getValueOfRange';

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
    const coefficientY = getCoefficientY(checkArr);
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
    const { coefficientX, stepOfValueX, minValue } = getCoefficientX(checkArr, width);
    const { minValueXOfRange, maxValueXOfRange } = getValueOfRange(coefficientX - coefficientX/* change for start position minus cofficent*/, limiter.width, minValue, stepOfValueX, coefficientX);

    return (
      <div className="App" style={{position: 'relative'}}>
        <Field
          width={width}
          heightGap={(height * workHeightCoefficient) / 6}
        />
        <BottomCharts
          coefficientY={coefficientY}
          coefficientX={coefficientX}
          arrayOfItems={checkArr}
          height={height}
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
