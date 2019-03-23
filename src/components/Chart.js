import React from 'react';
import { getValue, getLengthOfArray } from '../utils/getValue';

const Chart = (props) => {
  const arrOfLine = [];
  const {
    heightWithPadding,
    index,
    color,
    coefficientY,
    coefficientX,
    minValue,
    maxValue,
    isCharts,
    renderDot,
    width,
    changeStateOfTip,
  } = props;
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

    const line = (
      <React.Fragment>
        <line
          stroke={color}
          strokeWidth={2}
          x1={i === 0 ? 0 : coefficientX * indexForRenderX}
          y1={i === 0 ? heightWithPadding : heightWithPadding - (getValue(4, index, i) / coefficientY)}
          x2={coefficientX * indexForRenderX + coefficientX}
          y2={heightWithPadding - ((getValue(4,index, i + 1) / coefficientY))}
        />
        {
          renderDot
            ? <circle
                onTouchStart={(evt) => showTooltip(evt, 'This is blue', i , changeStateOfTip)}
                onTouchEnd={() => hideTooltip(changeStateOfTip)}
                onMouseMove={(evt) => showTooltip(evt, 'This is blue', i, changeStateOfTip)}
                onMouseOut={() => hideTooltip(changeStateOfTip)}
                fill={'transparent'}
                cx={i === 0 ? 0 : coefficientX * indexForRenderX}
                cy={i === 0 ? heightWithPadding : heightWithPadding - (getValue(4, index, i) / coefficientY)}
                r={10}
            />
            : null
        }
      </React.Fragment>
    );

    arrOfLine.push(line);
  }

  return arrOfLine;
};

const showTooltip = (evt, text, index, cb) => {
  cb(true, evt.pageX, index)
};

const hideTooltip = (cb) => {
  cb(false, 1, 1)
};

export default Chart;
