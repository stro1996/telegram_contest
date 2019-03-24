import { getLengthOfArray, getValue, getFirstValueOfArrayOfDate, getMaxValueOFArrayOfDate, getChartsQantity } from "./getValue";

const getMaxValueOfThisIndex = (elementIndex, data, indexOfChart) => {
  let maxElementInRange = getValue(indexOfChart, 1, elementIndex);
  if (data[0] === null) {
    maxElementInRange = 0;
  }

  for (let i = 2; i <= getChartsQantity(4); i++) {
    let value = getValue(indexOfChart, i, elementIndex);
    if (data[i - 1] === null) {
      value = 0;
    }

    if (value > maxElementInRange) {
      maxElementInRange = value;
    }
  }

  return maxElementInRange;
};

export const getCoefficientYForBottomBar = (data, range, indexOfChart) => {
  let coefficient = 1;
  let maxValue = 1;

    for (let elementIndex = 1; elementIndex < getLengthOfArray(4); elementIndex++) {
      let maxElementInRange = getMaxValueOfThisIndex(elementIndex, data, indexOfChart);

      if (maxValue < maxElementInRange) {
        maxValue = maxElementInRange;
        coefficient = checkMaxValue(maxValue, coefficient, range);
      }
    }

  return coefficient;
};

const checkMaxValue = (maxValue, coefficient, range) => {
  if (maxValue > range) {
    return calculateCoefficient(maxValue, range);
  }

  if (maxValue < range) {
    return calculateCoefficient(maxValue, range);
  }

  return coefficient;
};

const calculateCoefficient = (maxValue, range) => {
  return maxValue / range;
};

export const getCoefficientX = (data, width, indexOfChart) => {
  let maxQuantity = 1;
  let minValue = getFirstValueOfArrayOfDate(indexOfChart);
  let maxValue = getMaxValueOFArrayOfDate(indexOfChart);
  let step = 0;
  for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
    if (data[dataIndex] === null) {
      continue;
    }
    const arrayLength = getLengthOfArray(indexOfChart);
    const newMinValue = getFirstValueOfArrayOfDate(indexOfChart);
    const newMaxValue = getMaxValueOFArrayOfDate(indexOfChart);
    step = getValue(indexOfChart, 0, 2) - getValue(indexOfChart, 0, 1);

    if (minValue > newMinValue) {
      minValue = newMinValue;
    }

    if (maxValue < newMaxValue ) {
      maxValue  = newMaxValue;
    }

    if (arrayLength > maxQuantity) {
      maxQuantity = arrayLength;
    }
  }

  const coefficientX = (width - 20) / maxQuantity;

  const stepOfValueX =  Math.floor(step) / coefficientX;

  return {
    coefficientX,
    stepOfValueX,
    minValue,
    maxValue,
  };
};


export const getValueAndCoefficientYForChart = (data, minValueXOfRange, maxValueXOfRange, range, indexOfChart) => {
  let coefficient = 1;
  let maxValue = 1;

    for (let elementIndex = 1; elementIndex < getLengthOfArray(indexOfChart); elementIndex++) {
      const targetValue = getValue(indexOfChart, 0, elementIndex);
      if (targetValue > maxValueXOfRange ||  targetValue < minValueXOfRange) {
        continue;
      }
      let maxElementInRange = getMaxValueOfThisIndex(elementIndex, data, indexOfChart);

      if (maxValue < maxElementInRange) {
        maxValue = maxElementInRange;
        coefficient = checkMaxValue(maxValue, coefficient, range);
      }
    }

  return {
    coefficient,
    maxValue
  };
};

export const getCoefficientXForCharts = (width, minValueXOfRange, maxValueXOfRange, coefficientX, stepOfValueX) => {
  return (width - 20) / Math.ceil(((maxValueXOfRange - minValueXOfRange) / stepOfValueX) / coefficientX);
};
