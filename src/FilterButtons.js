import React from "react";
import './FilterButtons.css';

const FilterButtons = ({data}) => {
    const firstItem = data[0]
    const keys = Object.keys(firstItem);
    // console.log(keys)

    function getUniqueValuesForKey(data, keyName) {
      const values = new Set();
      for (const item of data) {
        values.add(item[keyName]);
      }
      return Array.from(values);
    }

    function RadioOptions({buttonTitle}) {
        const valueArray = getUniqueValuesForKey(data, buttonTitle)
        console.log('rb', buttonTitle, 'options', valueArray)
        return (
          <div>
            {valueArray.map((option, index) => (
              <div>
                <input type="radio" name="option" value={option} />
                <label className = 'option' key={index}>{option}</label>
              </div>
            ))}
          </div>
        );
      }

    console.log(getUniqueValuesForKey(data, 'filter'))

    return (
      <div className = 'filterContainer'>
        {keys.map(key => (
          <div className= 'filter'>
            <div className='radioTitle' key={key}>{key}</div>
            <RadioOptions buttonTitle = {key} />
          </div>
        ))}
      </div>
    );
}

export default FilterButtons;