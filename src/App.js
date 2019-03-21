import React, { Component } from 'react';
import './App.css';

import { Rnd } from "react-rnd";

import Field from './components/Field';
import BottomCharts from './components/BottomCharts';
import Charts from './components/Charts';
import BottomMeasure from './components/BottomMeasure';
import Button from './components/Button';
import { workHeightCoefficient } from './const/constForСalculations';
import {
  getCoefficientYForBottomBar,
  getCoefficientX,
  getValueAndCoefficientYForChart,
  getCoefficientXForCharts,
} from './utils/getCoefficient';
import { getValueXOfRange } from './utils/getValueOfRange';
import { rangeForBottomBar } from "./const/constForСalculations";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "transparent"
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayOfButton: [0, 1, 2, 3],
      width: 200,
      height: 200,
      coefficientY: 1,
      limiter: {
        x: 0,
        y: 650,
        width: 100,
        height: 150,
        isResizing: false,
        isDragging: false,
      },
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const { arrayOfButton } = this.state;
    this.updateWindowDimensions();
    const coefficientY = getCoefficientYForBottomBar(arrayOfButton, rangeForBottomBar);
    this.setState({ coefficientY });
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handelClickOnButton = (index) => {
    let newArray = [...this.state.arrayOfButton];
    const targetValue = newArray[index];

    if (targetValue !== null) {
      newArray[index] = null;
    } else {
      newArray[index] = index;
    }

    const coefficientY = getCoefficientYForBottomBar(newArray, rangeForBottomBar);

    requestAnimationFrame(() => {
      this.setState({
        arrayOfButton: newArray,
        coefficientY,
      });
    })
  };

  onDrag = (e, d) => {
    const { limiter, width } = this.state;
    const newLimiter = { ...limiter };
    let newX = d.x;
    if (newX < 0) {
      newX = 0;
    }

    if (newX > width - limiter.width) {
      newX = width;
    }

    newLimiter.x = newX;
    newLimiter.y = 650;
    requestAnimationFrame(() => {
      this.setState({
        limiter: newLimiter,
      });
    });
  };

  onResize = (e, direction, ref, delta, position) => {
    // TODO fix this
    const { limiter } = this.state;
    const newLimiter = { ...limiter };
    newLimiter.width = e.x;
    requestAnimationFrame(() => {
      this.setState({
        limiter: newLimiter,
      });
    });
  };

  render() {
    const { width, height, limiter, coefficientY, arrayOfButton } = this.state;

    const heightWithPaddingForCharts = (height * workHeightCoefficient);
    const { coefficientX, stepOfValueX, minValue, maxValue } = getCoefficientX(arrayOfButton, width);
    const { minValueXOfRange, maxValueXOfRange } = getValueXOfRange(limiter.x - coefficientX, limiter.width, minValue, stepOfValueX, coefficientX);
    const {
      coefficient: coefficientForCharts,
      maxValue: maxValueForCharts
    } = getValueAndCoefficientYForChart(arrayOfButton, minValueXOfRange, maxValueXOfRange, heightWithPaddingForCharts - heightWithPaddingForCharts / 6 );
    const coefficientXForCharts = getCoefficientXForCharts(width, minValueXOfRange, maxValueXOfRange, coefficientX, stepOfValueX);

    const heightWithPaddingForBottomBar = heightWithPaddingForCharts + 150;

    return (
      <div className="App" style={{position: 'relative'}}>
        <Field
          maxValue={maxValueForCharts}
          width={width}
          heightGap={heightWithPaddingForCharts / 6}
        />

        <BottomMeasure
          maxValue={maxValueXOfRange}
          step={width / 6}
          stepByDtae={(maxValueXOfRange - minValueXOfRange) / 5}
          positionByY={heightWithPaddingForCharts}
          width={width}
          minValue={minValueXOfRange}
        />

        <div style={{position: 'absolute', top: height - 100}}>
          {
            arrayOfButton.map((item, index) =>
              <Button
                key={index}
                index={index}
                title={'title'}
                onPress={this.handelClickOnButton}
              />
            )
          }
        </div>
        <Rnd
          style={style}
          dragAxis={'x'}
          size={{ width: limiter.width, height: limiter.height }}
          position={{ x: limiter.x, y: limiter.y }}
          onDrag={this.onDrag}
          onResize={this.onResize}
        >
          Rnd
        </Rnd>
        <svg width={width} height={height}>
          <BottomCharts
            coefficientY={coefficientY}
            coefficientX={coefficientX}
            arrayOfItems={arrayOfButton}
            minValue={minValue}
            maxValue={maxValue}
            width={width}
            heightWithPadding={heightWithPaddingForBottomBar}
          />
          <Charts
            coefficientY={coefficientForCharts}
            coefficientX={coefficientXForCharts}
            arrayOfItems={arrayOfButton}
            minValue={minValueXOfRange}
            maxValue={maxValueXOfRange}
            width={width}
            heightWithPadding={heightWithPaddingForCharts}
            isCharts={true}
            height={height}
          />
        </svg>
      </div>
    );
  }
}

export default App;
