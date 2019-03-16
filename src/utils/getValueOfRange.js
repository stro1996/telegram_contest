export const getValueOfRange = (startPosition, range, firstValue, step, coefficientX) => {
  const minValueXOfRange = (Math.ceil(startPosition / coefficientX ) * step ) + firstValue;
  const maxValueXOfRange = (Math.ceil((startPosition + range) / coefficientX ) * step ) + firstValue;

  return {
    minValueXOfRange,
    maxValueXOfRange,
  };
};
