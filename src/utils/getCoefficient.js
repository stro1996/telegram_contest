import { getLengthOfArray, getValue, getFirstValueOfArrayOfDate, getMaxValueOFArrayOfDate } from "./getValue";

export const getCoefficientYForBottomBar = (data, range) => {
  let coefficient = 1;
  let maxValue = 1;
  for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
    if (data[dataIndex] === null) {
      continue;
    }

    for (let elementIndex = 1; elementIndex < getLengthOfArray(dataIndex); elementIndex++) {
      const firstArrayValue = getValue(dataIndex, 1, elementIndex); // TODO rewrite to all Y value
      const secondArrayValue = getValue(dataIndex, 2, elementIndex); // TODO rewrite to all Y value

      if (firstArrayValue > secondArrayValue) {
        if (maxValue < firstArrayValue) {
          maxValue = firstArrayValue;
          coefficient = checkMaxValue(maxValue, coefficient, range);
        }
      } else {
        if (maxValue < secondArrayValue) {
          maxValue = secondArrayValue;
          coefficient = checkMaxValue(maxValue, coefficient, range);
        }
      }
    }
  }

  return coefficient;
};

const checkMaxValue = (maxValue, coefficient, range) => {
  if (maxValue > range) {
    return calculateCoefficient(maxValue, coefficient ,range);
  }

  return coefficient;
};

const calculateCoefficient = (maxValue, coefficient, range) => {
  let newCoefficient = coefficient;
  if ((maxValue / coefficient) > range) {
    return calculateCoefficient(maxValue, newCoefficient * 1.2, range);
  }

  return newCoefficient;
};

export const getCoefficientX = (data, width) => {
  let maxQuantity = 1;
  let minValue = getFirstValueOfArrayOfDate(0);
  let maxValue = getMaxValueOFArrayOfDate(0);
  let step = 0;
  for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
    if (data[dataIndex] === null) {
      continue;
    }
    const arrayLength = getLengthOfArray(dataIndex);
    const newMinValue = getFirstValueOfArrayOfDate(dataIndex);
    const newMaxValue = getMaxValueOFArrayOfDate(dataIndex);
    step = getValue(dataIndex, 0, 2) - getValue(dataIndex, 0, 1);

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
  for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
    if (data[dataIndex] === null) {
      continue;
    }
    const firstValue = getValue(dataIndex, 0, 1);
    if (firstValue > maxValueXOfRange) {
      continue;
    }

    for (let elementIndex = 1; elementIndex < getLengthOfArray(dataIndex); elementIndex++) {
      const targetValue = getValue(dataIndex, 0, elementIndex);
      if (targetValue > maxValueXOfRange ||  targetValue < minValueXOfRange) {
        continue;
      }

      const firstArrayValue = getValue(dataIndex, 1, elementIndex); // TODO rewrite to all Y value
      const secondArrayValue = getValue(dataIndex, 2, elementIndex); // TODO rewrite to all Y value

      if (firstArrayValue > secondArrayValue) {
        if (maxValue < firstArrayValue) {
          maxValue = firstArrayValue;
          coefficient = checkMaxValue(maxValue, coefficient, range);
        }
      } else {
        if (maxValue < secondArrayValue) {
          maxValue = secondArrayValue;
          coefficient = checkMaxValue(maxValue, coefficient, range);
        }
      }
    }
  }

  return {
    coefficient,
    maxValue
  };
};

export const getCoefficientXForCharts = (width, startPosition, range, coefficientX) => {
  return (width - 20) / Math.ceil((startPosition + range) / coefficientX);
};
