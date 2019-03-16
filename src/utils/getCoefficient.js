import { getLengthOfArray, getValue, getFirstValueOfArrayOfDate, getMaxValueOFArrayOfDate } from "./getValue";
import { range } from "../const/constForСalculations";

export const getCoefficientY = (data) => {
  let coefficient = 1;
  let maxValue = 1;
  for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
    if (!data[dataIndex]) {
      continue;
    }

    for (let elementIndex = 1; elementIndex < getLengthOfArray(dataIndex); elementIndex++) {
      const firstArrayValue = getValue(dataIndex, 1, elementIndex);
      const secondArrayValue = getValue(dataIndex, 2, elementIndex);

      if (firstArrayValue > secondArrayValue) {
        if (maxValue < firstArrayValue) {
          maxValue = firstArrayValue;
          coefficient = checkMaxValue(maxValue, coefficient);
        }
      } else {
        if (maxValue < secondArrayValue) {
          maxValue = secondArrayValue;
          coefficient = checkMaxValue(maxValue, coefficient);
        }
      }
    }
  }

  return {
    coefficient,
    maxValue,
  };
};

const checkMaxValue = (maxValue, coefficient) => {
  if (maxValue > range) {
    return calculateCoefficient(maxValue, coefficient);
  }

  return coefficient;
};

const calculateCoefficient = (maxValue, coefficient) => {
  let newCoefficient = coefficient;
  if ((maxValue / coefficient) > range) {
    return calculateCoefficient(maxValue, newCoefficient * 1.2);
  }

  return newCoefficient;
};

export const getCoefficientX = (data, width) => {
  let maxQuantity = 1;
  let minValue = getFirstValueOfArrayOfDate(0);
  let maxValue = getMaxValueOFArrayOfDate(0);
  for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
    if (!data[dataIndex]) {
      continue;
    }
    const arrayLength = getLengthOfArray(dataIndex);
    const newMinValue = getFirstValueOfArrayOfDate(dataIndex);
    const newMaxValue = getMaxValueOFArrayOfDate(dataIndex);


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

  const stepOfValueX =  Math.floor((maxValue - minValue) / coefficientX);

  return {
    coefficientX,
    stepOfValueX,
  };
};
