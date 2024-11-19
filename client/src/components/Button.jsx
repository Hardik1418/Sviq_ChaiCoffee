import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ link, color, text }) => (
  <a
    href={link}
    className={`px-8 py-4 rounded-lg text-1xl font-bold text-white transition transform hover:scale-105 ${color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
  >
    {text}
  </a>
);

Button.propTypes = {
  link: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
