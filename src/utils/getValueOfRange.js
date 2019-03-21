export const getValueXOfRange = (startPosition, range, firstValue, step, coefficientX) => {
  const minValueXOfRange = Math.ceil(startPosition  * step ) + firstValue;
  const maxValueXOfRange = Math.ceil((startPosition + range) * step ) + firstValue;

  return {
    minValueXOfRange,
    maxValueXOfRange,
  };
};

