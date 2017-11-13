import React from 'react';
import PropTypes from 'prop-types';

const SummaryTable = ({ title, items }) => {
  return (
    <div className="sdc-isolation">
      <div className="summary">
        <h2 className="summary__title saturn" id="">{title}</h2>
        {
          items.map((item) => {
            return (
              <div key={item.key} className="summary__items">
                <div className="summary__question" id="">
                  {item.key}
                </div>
                <div className="summary__answer">
                  <div className="summary__answer-text" id="">{item.value}</div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

SummaryTable.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default SummaryTable;
