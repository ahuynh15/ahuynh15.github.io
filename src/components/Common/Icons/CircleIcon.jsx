import React from 'react';
import PropTypes from 'prop-types';

const CircleIcon = function CircleIcon({
  size = 32,
  strokeWidth = 2,
  color = 'currentColor',
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-x"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

CircleIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
};

CircleIcon.defaultProps = {
  size: 32,
  color: 'currentColor',
  strokeWidth: 2,
};

export default CircleIcon;
