// create measureReducer

export const measureReducer = (state = [], action) => {
  switch (action.type) {
    case 'MEASURE':
      return [action.measure];
    default:
      return state;
  }
};

export const measurmentReducer = (state = [], action) => {
  switch (action.type) {
    case 'MEASUREMENTS':
      return [action.measurements];
    default:
      return state;
  }
};

export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};
