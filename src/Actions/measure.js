// Create measure actions
export const createMeasure = (measure) => {
  return {
    type: "MEASURE",
    measure,
  };
};

export const createMeasurments = (measurements) => {
  return {
    type: "MEASUREMENTS",
    measurements,
  };
};
