import PropTypes from 'prop-types';

const StatsCard = ({ title, value }) => (
  <div className="bg-black bg-opacity-80 p-3 rounded-lg shadow-lg text-center w-48 h-20">
    <h3 className="text-xl text-yellow-400 mb-0">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatsCard;
