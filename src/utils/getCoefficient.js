import { getLengthOfArray, getValue, getFirstValueOfArrayOfDate, getMaxValueOFArrayOfDate, getChartsQantity } from "./getValue";

const getMaxValueOfThisIndex = (elementIndex, data) => {
  let maxElementInRange = getValue(4, 1, elementIndex);
  if (data[0] === null) {
    maxElementInRange = 0;
  }

  for (let i = 2; i <= getChartsQantity(4); i++) {
    let value = getValue(4, i, elementIndex);
    if (data[i - 1] === null) {
      value = 0;
    }

    if (value > maxElementInRange) {
      maxElementInRange = value;
    }
  }

  return maxElementInRange;
};

export const getCoefficientYForBottomBar = (data, range) => {
  let coefficient = 1;
  let maxValue = 1;

  // for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
  //   if (data[dataIndex] === null) {
  //     continue;
  //   }

    for (let elementIndex = 1; elementIndex < getLengthOfArray(4); elementIndex++) {
      let maxElementInRange = getMaxValueOfThisIndex(elementIndex, data);

      if (maxValue < maxElementInRange) {
        maxValue = maxElementInRange;
        coefficient = checkMaxValue(maxValue, coefficient, range);
      }
    }
  // }

  return coefficient;
};

const checkMaxValue = (maxValue, coefficient, range) => {
  if (maxValue > range) {
    return calculateCoefficient(maxValue, range);
  }

  return coefficient;
};

const calculateCoefficient = (maxValue, range) => {
  return maxValue / range;
};

export const getCoefficientX = (data, width) => {
  let maxQuantity = 1;
  let minValue = getFirstValueOfArrayOfDate(4);
  let maxValue = getMaxValueOFArrayOfDate(4);
  let step = 0;
  for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
    if (data[dataIndex] === null) {
      continue;
    }
    const arrayLength = getLengthOfArray(4);
    const newMinValue = getFirstValueOfArrayOfDate(4);
    const newMaxValue = getMaxValueOFArrayOfDate(4);
    step = getValue(4, 0, 2) - getValue(4, 0, 1);

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


export const getValueAndCoefficientYForChart = (data, minValueXOfRange, maxValueXOfRange, range) => {
  let coefficient = 1;
  let maxValue = 1;
  // for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
  //   if (data[dataIndex] === null) {
  //     continue;
  //   }

    // const firstValue = getValue(4, 0, 1);
    // if (firstValue > maxValueXOfRange) {
    //   continue;
    // }

    for (let elementIndex = 1; elementIndex < getLengthOfArray(4); elementIndex++) {
      const targetValue = getValue(4, 0, elementIndex);
      if (targetValue > maxValueXOfRange ||  targetValue < minValueXOfRange) {
        continue;
      }
      let maxElementInRange = getMaxValueOfThisIndex(elementIndex, data);

      if (maxValue < maxElementInRange) {
        maxValue = maxElementInRange;
        coefficient = checkMaxValue(maxValue, coefficient, range);
      }
    }
  // }

  return {
    coefficient,
    maxValue
  };
};

export const getCoefficientXForCharts = (width, startPosition, range, coefficientX) => {
  return (width - 20) / Math.ceil((startPosition + range) / coefficientX);
};
