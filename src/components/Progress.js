import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './progress.css';
import RadialSeparators from './RadialSeparators';

const Progress = ({ number, time }) => (
  <Row className="my-2 pro p-3">
    <h4 className="text-center">
      Your achivement for
      {` ${time}`}
    </h4>
    <div className="mx-auto" style={{ width: 200, height: 200 }}>
      <CircularProgressbarWithChildren
        value={number && number}
        text={`${number !== 'NaN' ? number : 0}%`}
        strokeWidth={10}
        styles={buildStyles({
          strokeLinecap: 'butt',
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: '#fff',
            width: '2px',
            // This needs to be equal to props.strokeWidth
            height: `${10}%`,
          }}
        />
      </CircularProgressbarWithChildren>
    </div>
  </Row>
);

Progress.propTypes = {
  // eslint-disable-next-line
  number: PropTypes.any.isRequired,
  time: PropTypes.string.isRequired,
};
export default Progress;
