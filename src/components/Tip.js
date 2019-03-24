import React, { Component } from 'react';
import { getName, getValue, getColor } from "../utils/getValue";
import { Line } from 'react-lineto';

const Tip = (props) => {
  const { show, arrayOfValue, positionX, indexOfValue, height, positionOfTipY } = props;

  if (!show) {
    return null
  }
  const date = new Date(getValue(4, 0, indexOfValue));
  return (
    <React.Fragment>
      <div style={{
        position: 'absolute',
        top: 0,
        left: positionX - 250,
        flexDirection: 'column',
        display: 'flex',
        zIndex: 2,
        width: 500,
        pointerEvents: 'none',
        alignItems: 'center',
      }}>
        <p style={{ textAlign: 'center' }}>{date.toDateString()}</p>
        <div style={{flexDirection: 'row', display: 'flex', zIndex: 100}}>
          {getArrayOfItems(arrayOfValue, indexOfValue)}
        </div>
      </div>
        <Line
          zIndex={1}
          borderColor={'gray'}
          x0={positionX}
          y0={positionOfTipY}
          x1={positionX}
          y1={height}
        />
    </React.Fragment>

  );
};

const getArrayOfItems = (arrayOfValue, indexOfValue) => {
  let arrayOfItems = [];
  arrayOfValue.forEach((item, index) => {
    if (item === null) {
      return
    }
    const color = getColor(4, `y${index}`);
    const newItem = (<div style={{margin: '0 10px'}}>
      <p style={{ color, textAlign: 'center' }}>{getValue(4, index + 1, indexOfValue)}</p>
      <p style={{ color, textAlign: 'center' }}>{getName(4, `y${index}`)}</p>
    </div>);

    arrayOfItems.push(newItem)
  });


  return arrayOfItems;
};

export default Tip;
