import React from 'react';
import { Line } from 'react-lineto';
import { getValue, getLengthOfArray } from '../utils/getValue';

const Chart = (props) => {
  const arr = [];
  const { heightWithPadding, index, color, coefficientY, coefficientX, minValue, maxValue, isCharts } = props;
  for (let i = 1; i < getLengthOfArray(index); i++) {
    const targetValue = getValue(index, 0, i);
    if (targetValue > maxValue ||  targetValue < minValue) {
      continue;
    }
    const indexForRender = isCharts ? (i - 1) : i;

    const mainLine = <Line
      borderColor={color}
      x0={coefficientX * indexForRender}
      y0={heightWithPadding - (getValue(index, 1, i) / coefficientY)}
      x1={coefficientX * indexForRender + coefficientX}
      y1={heightWithPadding - (getValue(index,2, i) / coefficientY)}
    />;
    arr.push(mainLine);

    const supportLine = <Line
      borderColor={color}
      x0={coefficientX * indexForRender + coefficientX}
      y0={heightWithPadding - ((getValue(index,2, i) / coefficientY))}
      x1={coefficientX * indexForRender + coefficientX}
      y1={heightWithPadding - ((getValue(index,1, i + 1) / coefficientY))}
    />;
    arr.push(supportLine);
  }

  return arr;
};

export default Chart;
