import React from 'react';
import { Line } from 'react-lineto';
import { getValue, getLengthOfArray } from '../utils/getValue';

const Chart = (props) => {
  const arrOfLine = [];
  const { heightWithPadding, index, color, coefficientY, coefficientX, minValue, maxValue, isCharts } = props;
  let resetIndex = 0;
  for (let i = 1; i < getLengthOfArray(4); i++) {

    const targetValue = getValue(4, 0, i);
    if (targetValue > maxValue ||  targetValue < minValue) {
      resetIndex = i;
      continue;
    }

    const indexForRenderX = isCharts ? (i - 1) - resetIndex : i;

    const line = <Line
      borderColor={color}
      x0={coefficientX * indexForRenderX}
      y0={heightWithPadding - (getValue(4, index, i) / coefficientY)}
      x1={coefficientX * indexForRenderX + coefficientX}
      y1={heightWithPadding - ((getValue(4,index, i + 1) / coefficientY))}
    />;

    arrOfLine.push(line);
  }

  return arrOfLine;
};

export default Chart;
