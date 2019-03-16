import data from "../chart_data";

export const getValue = (indexOfChart, indexOfArray, indexElement) => {
  return data
    && data[indexOfChart]
    && data[indexOfChart].columns
    && data[indexOfChart].columns[indexOfArray]
    && data[indexOfChart].columns[indexOfArray][indexElement];
};

export const getLengthOfArray = (index) => {
  return data
    && data[index]
    && data[index].columns
    && data[index].columns[0]
    && data[index].columns[0].length;
};

export const getFirstValueOfArrayOfDate = (index) => {
  return data
    && data[index]
    && data[index].columns
    && data[index].columns[0]
    && data[index].columns[0][1];
};

export const getMaxValueOFArrayOfDate = (index) => {
  return data
    && data[index]
    && data[index].columns
    && data[index].columns[0]
    && data[index].columns[0][data[index].columns[0].length - 1];
};
