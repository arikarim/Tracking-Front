import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

function Separator({ turns, style }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        transform: `rotate(${turns}turn)`,
      }}
    >
      <div style={style} />
    </div>
  );
}

function RadialSeparators(props) {
  const turns = 1 / props.count;
  return _.range(props.count).map((index) => (
    <Separator key={index} turns={index * turns} style={props.style} />
  ));
}

Separator.propTypes = {
  turns: PropTypes.number.isRequired,
  style: PropTypes.shape({
    background: PropTypes.string,
  }).isRequired,
};

export default RadialSeparators;
