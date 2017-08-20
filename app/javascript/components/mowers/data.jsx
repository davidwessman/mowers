import React from 'react';
import Icon from 'components/icon';
import PropTypes from 'prop-types';

const MowerData = ({ mower }) => (
  <ul>
    <li><Icon icon="hashtag" />{`Id: ${mower.id}`}</li>
    <li><Icon icon="tasks" />{mower.brand}</li>
    <li><Icon icon="tag" />{mower.model}</li>
    <li><Icon icon="calendar" /> {mower.year}</li>
  </ul>
);

MowerData.propTypes = {
  mower: PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

export default MowerData;
