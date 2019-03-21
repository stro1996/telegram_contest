import React from 'react';
import { Line } from 'react-lineto';
import { getValue, getLengthOfArray } from '../utils/getValue';

const Chart = (props) => {
  const arrOfLine = [];
  const { heightWithPadding, index, color, coefficientY, coefficientX, minValue, maxValue, isCharts } = props;
  let resetIndex = 0;
  for (let i = 0; i < getLengthOfArray(4); i++) {

    const targetValue = getValue(4, 0, i);
    if (i !== 0 && (targetValue > maxValue ||  targetValue < minValue)) {
      resetIndex = i;
      continue;
    }

    const indexForRenderX = isCharts ? (i - 1) - resetIndex : i;
    if (i === getLengthOfArray(4) - 1) {
      continue
    }
    //borderColor={color}
    const line = <line
      stroke={color}
      strokeWidth={2}
      x1={i === 0 ? 0 : coefficientX * indexForRenderX}
      y1={i === 0 ? heightWithPadding : heightWithPadding - (getValue(4, index, i) / coefficientY)}
      x2={coefficientX * indexForRenderX + coefficientX}
      y2={heightWithPadding - ((getValue(4,index, i + 1) / coefficientY))}
    />;

    arrOfLine.push(line);
  }

  return arrOfLine;
};

export default Chart;
