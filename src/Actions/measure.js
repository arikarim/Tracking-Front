// Create measure actions
export const createMeasure = (measure) => ({
  type: 'MEASURE',
  measure,
});

export const createMeasurments = (measurements) => ({
  type: 'MEASUREMENTS',
  measurements,
});
