import React from 'react';
import { Line } from 'react-lineto';
import { getValue, getLengthOfArray } from '../utils/getValue';
import { workHeightCoefficient } from '../const/constForСalculations';

const Chart = (props) => {
  const arr = [];
  const { height, index, color, coefficientY, coefficientX } = props;

  const heightWithPadding = (height * workHeightCoefficient) + 150;

  for (let i = 1; i < getLengthOfArray(index); i++) {
    const mainLine = <Line
      borderColor={color}
      x0={coefficientX * i}
      y0={heightWithPadding - (getValue(index, 1, i) / coefficientY)}
      x1={coefficientX * i + coefficientX}
      y1={heightWithPadding - (getValue(index,2, i) / coefficientY)}
    />;
    arr.push(mainLine);

    const supportLine = <Line
      borderColor={color}
      x0={coefficientX * i + coefficientX}
      y0={heightWithPadding - ((getValue(index,2, i) / coefficientY))}
      x1={coefficientX * i + coefficientX}
      y1={heightWithPadding - ((getValue(index,1, i + 1) / coefficientY))}
    />;
    arr.push(supportLine);
  }

  return arr;
};

export default Chart;
