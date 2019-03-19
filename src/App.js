import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { Rnd } from "react-rnd";

import Field from './components/Field';
import BottomCharts from './components/BottomCharts';
import Resizer from './components/Resizeble';
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

//const checkArr = [0, 1, 2, 3];

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
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
        x: 10,
        y: 650,
        width: 100,
        height: 150,
        isResizing: false,
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
    requestAnimationFrame(() => this.setState({
      limiter: newLimiter,
    }));
  };

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

  render() {
    const { width, height, limiter, coefficientY, arrayOfButton } = this.state;
    const heightWithPaddingForCharts = (height * workHeightCoefficient);

    const { coefficientX, stepOfValueX, minValue, maxValue } = getCoefficientX(arrayOfButton, width);
    const { minValueXOfRange, maxValueXOfRange } = getValueXOfRange(limiter.x- coefficientX, limiter.width, minValue, stepOfValueX, coefficientX);
    const { coefficient: coefficientForCharts, maxValue: maxValueForCharts } = getValueAndCoefficientYForChart(arrayOfButton, minValueXOfRange, maxValueXOfRange, heightWithPaddingForCharts - heightWithPaddingForCharts / 6 );
    const coefficientXForCharts = getCoefficientXForCharts(width, limiter.x - coefficientX, limiter.width, coefficientX);

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
          arrayOfItems={arrayOfButton}
          minValue={minValue}
          maxValue={maxValue}
          width={width}
          heightWithPadding={heightWithPaddingForBottomBar}
        />
        <BottomMeasure
          maxValue={maxValueXOfRange}
          step={width / 6}
          stepByDtae={(maxValueXOfRange - minValueXOfRange) / 5}
          positionByY={heightWithPaddingForCharts}
          width={width}
          minValue={minValueXOfRange}
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
        {/*<Rnd*/}
          {/*style={style}*/}
          {/*dragAxis={'x'}*/}
          {/*size={{ width: limiter.width, height: limiter.height }}*/}
          {/*position={{ x: limiter.x, y: limiter.y }}*/}
          {/*onDrag={(e, d) => {*/}
            {/*const newLimiter = { ...limiter };*/}
            {/*newLimiter.x = d.x;*/}
            {/*newLimiter.y = d.y;*/}
            {/*this.setState({ limiter: newLimiter, });*/}
          {/*}}*/}
          {/*onResize={(e, direction, ref, delta, position) => {*/}
            {/*const newLimiter = { ...limiter };*/}
            {/*newLimiter.width = e.x;*/}
            {/*this.setState({*/}
              {/*limiter: newLimiter,*/}
            {/*});*/}
          {/*}}*/}
        {/*>*/}
          {/*Rnd*/}
        {/*</Rnd>*/}
      </div>
    );
  }
}

export default App;
