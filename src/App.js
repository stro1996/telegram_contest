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
  background: "transparent",
  borderRadius: '5px 5px 5px 5px',
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
        height: 100,
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
    const newLimiter =  { ...this.state.limiter };
    newLimiter.y = (window.innerHeight * workHeightCoefficient) + 50;
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      limiter: newLimiter,
    });
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
    newLimiter.y = limiter.y;
    requestAnimationFrame(() => {
      this.setState({
        limiter: newLimiter,
      });
    });
  };

  onResize = (e, direction, ref, delta, position) => {
    const { limiter } = this.state;
    const newLimiter = { ...limiter };

    if (direction === 'right') {
      newLimiter.width = e.x - newLimiter.x;
    }

    if (direction === 'left') {
      const oldX = newLimiter.x;
      newLimiter.x = e.x;
      newLimiter.width += (oldX - e.x);
    }

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

        <div style={{position: 'absolute', top: height - 50}}>
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
          <div style={{ position: 'absolute', backgroundColor: 'rgba(230, 14, 14, 0.4)', top: 0, bottom: 0, left: 0, width: 10, borderRadius: '5px 0px 0px 5px'}}>

          </div>
          <div style={{ position: 'absolute', backgroundColor: 'rgba(230, 14, 14, 0.4)', top: 0, bottom: 0, right: 0, width: 10, borderRadius: '0px 5px 5px 0px' }}>

          </div>
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
