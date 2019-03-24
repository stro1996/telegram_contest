import React, { Component } from 'react';
import './App.css';

import { Rnd } from "react-rnd";

import Field from './components/Field';
import BottomCharts from './components/BottomCharts';
import Charts from './components/Charts';
import BottomMeasure from './components/BottomMeasure';
import Button from './components/Button';
import Tip from './components/Tip';
import { workHeightCoefficient } from './const/constForСalculations';
import {
  getCoefficientYForBottomBar,
  getCoefficientX,
  getValueAndCoefficientYForChart,
  getCoefficientXForCharts,
} from './utils/getCoefficient';
import { getValueXOfRange } from './utils/getValueOfRange';
import { rangeForBottomBar } from "./const/constForСalculations";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "transparent",
  borderRadius: '5px 5px 5px 5px',
};

class MainApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayOfButton: [0, 1, 2, 3],
      width: 200,
      height: 200,
      coefficientY: 1,
      showTip: false,
      positionOfTipX: 0,
      positionOfTipY: 0,
      indexValueOnTip: 0,
      indexOfChart: 0,
      resetAll: false,
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
    const { match } = this.props;
    //const { arrayOfButton } = this.state;

    const indexOfChart = +match.params.index;
    const arrayOfButton = indexOfChart !== 4 ? [0, 1] : [0, 1 ,2 ,3];
    this.updateWindowDimensions();
    const coefficientY = getCoefficientYForBottomBar(arrayOfButton, rangeForBottomBar, indexOfChart);

    this.setState({ coefficientY, indexOfChart, arrayOfButton, resetAll: true }, () => this.setState({resetAll: false}));
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.match.params.index !== this.props.match.params.index) {
      const { match } = nextProps;
      const indexOfChart = +match.params.index;
      const arrayOfButton = indexOfChart !== 4 ? [0, 1] : [0, 1 ,2 ,3];
      const coefficientY = getCoefficientYForBottomBar(arrayOfButton, rangeForBottomBar, indexOfChart);
      this.setState({ coefficientY, indexOfChart, arrayOfButton, resetAll: true }, () => this.setState({resetAll: false}));
    }


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

    const coefficientY = getCoefficientYForBottomBar(newArray, rangeForBottomBar, this.state.indexOfChart);

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
      },);
    });
  };

  onResize = (e, direction, ref, delta, position) => {
    const { limiter } = this.state;
    const newLimiter = { ...limiter };

    if (direction === 'right') {

      if (e.type === 'touchmove') {
        const { targetTouches } = e;
        newLimiter.width = targetTouches[0].pageX - newLimiter.x;
      } else {
        newLimiter.width = e.x - newLimiter.x;
      }

    }

    if (direction === 'left') {

      if (e.type === 'touchmove') {
        const { targetTouches } = e;
        const oldX = newLimiter.x;
        newLimiter.x = targetTouches[0].pageX;
        newLimiter.width += (oldX - targetTouches[0].pageX);
      } else {
        const oldX = newLimiter.x;
        newLimiter.x = e.x;
        newLimiter.width += (oldX - e.x);
      }

    }

    requestAnimationFrame(() => {
      this.setState({
        limiter: newLimiter,
      });
    });
  };

  changeStateOfTip = (state, positionOfX, index, positionOfY) => {
    requestAnimationFrame(() => {
      this.setState({
        showTip: state,
        positionOfTipX: positionOfX,
        indexValueOnTip: index,
        positionOfTipY: positionOfY,
      });
    });
  };

  render() {
    const { width, height, limiter, coefficientY, arrayOfButton, showTip, positionOfTipX, indexValueOnTip, positionOfTipY, indexOfChart, resetAll } = this.state;

    const heightWithPaddingForCharts = (height * workHeightCoefficient);
    const { coefficientX, stepOfValueX, minValue, maxValue } = getCoefficientX(arrayOfButton, width, indexOfChart);
    const { minValueXOfRange, maxValueXOfRange } = getValueXOfRange(limiter.x - coefficientX, limiter.width, minValue, stepOfValueX, coefficientX);
    const {
      coefficient: coefficientForCharts,
      maxValue: maxValueForCharts
    } = getValueAndCoefficientYForChart(arrayOfButton, minValueXOfRange, maxValueXOfRange, heightWithPaddingForCharts - heightWithPaddingForCharts / 6, indexOfChart );
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
          delta={maxValueXOfRange - minValueXOfRange}
          step={width / 5.5}
          stepByDtae={(maxValueXOfRange - minValueXOfRange) / 6}
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
                onPress={this.handelClickOnButton}
                width={width}
                item={item}
                height={height}
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
            indexOfChart={indexOfChart}
            resetAll={resetAll}
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
            changeStateOfTip={this.changeStateOfTip}
            indexOfChart={indexOfChart}
          />
        </svg>
        <Tip
          show={showTip}
          arrayOfValue={arrayOfButton}
          positionX={positionOfTipX}
          indexOfValue={indexValueOnTip}
          height={height * workHeightCoefficient}
          positionOfTipY={positionOfTipY}
          indexOfChart={indexOfChart}
        />
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/chart/0">#1</Link>
          </li>
          <li>
            <Link to="/chart/1">#2</Link>
          </li>
          <li>
            <Link to="/chart/2">#3</Link>
          </li>
          <li>
            <Link to="/chart/3">#4</Link>
          </li>
          <li>
            <Link to="/chart/4">#5</Link>
          </li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path='/' component={Main}/>
          <Route exact={true} path="/chart/:index" component={MainApp} />
        </Switch>
      </Router>
    );
  }
}

export default App;
