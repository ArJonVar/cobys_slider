import React, { useState, useEffect } from 'react';
import './FilterButtons.css';

const FilterButtons = (props) => {
  const { data, setFilter, filterState, resetDefaults, projectArray } = props;
  const [availableOptions, setAvailableOptions] = useState({});

  useEffect(() => {
    updateAvailableOptions();
  }, [projectArray]);

  const updateAvailableOptions = () => {
    const newAvailableOptions = {};

    data.forEach(project => {
      project.assets.forEach(asset => {
        Object.keys(asset).forEach(key => {
          if (!newAvailableOptions[key]) {
            newAvailableOptions[key] = new Set();
          }
          newAvailableOptions[key].add(asset[key]);
        });
      });
    });

    setAvailableOptions(newAvailableOptions);
  };

  const handleFilterClick = (filterKey, filterValue) => {
    const updatedFilterState = { ...filterState };

    if (!updatedFilterState.hasOwnProperty(filterKey)) {
      updatedFilterState[filterKey] = [filterValue];
    } else {
      const index = updatedFilterState[filterKey].indexOf(filterValue);

      if (index === -1) {
        updatedFilterState[filterKey].push(filterValue);
      } else {
        updatedFilterState[filterKey].splice(index, 1);
      }
    }

    setFilter(updatedFilterState);
  };

  const handleFilterReset = (filterKey) => {
    const updatedFilterState = { ...filterState, [filterKey]: [] };
    setFilter(updatedFilterState);
  };

  return (
    <div className="filterContainer">
      {Object.keys(availableOptions).map(key => (
        <div key={key} className="filter">
          <label className="radioTitle">{key}</label>
          <div>
            {Array.from(availableOptions[key]).map(value => (
              <div key={`${key}-${value}`}>
                <input
                  type="checkbox"
                  checked={
                    filterState[key] ? filterState[key].includes(value) : false
                  }
                  onChange={() => handleFilterClick(key, value)}
                  disabled={!projectArray.some(project => project[key] === value)}
                />
                <label>{value}</label>
              </div>
            ))}
            <button onClick={() => handleFilterReset(key)}>RESET</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;
