import PropTypes from 'prop-types';

const MoonIcon = ({ size = 32, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-moon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
};

MoonIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default MoonIcon;
