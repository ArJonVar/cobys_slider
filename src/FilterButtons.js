import React, {useState} from "react";
import './FilterButtons.css';

const FilterButtons = (props) => {
    const data = props.data
    const setFilter = props.setFilter
    const filter = props.filter

    const firstItem = data[0]
    const keys = Object.keys(firstItem);

    function getUniqueValuesForKey(data, keyName) {
      const values = new Set();
      for (const item of data) {
        values.add(item[keyName]);
      }
      return Array.from(values);
    }

    function RadioOptions({buttonTitle}) {
        const valueArray = getUniqueValuesForKey(data, buttonTitle)
        // console.log('rb', buttonTitle, 'options', valueArray)
        console.log(buttonTitle)
        return (
          <div key={`outerdiv ${buttonTitle}`}>
            {valueArray.map((option, index) => (
              <div key={`innerdiv ${index}`}>
                <input type="radio" onClick={() => setFilter({...filter, [buttonTitle]: option})}
                    name="option" key={`input ${index}`} value={option} />
                <label className = 'option' key={`label ${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      }

    console.log(filter)
    return (
      <div className = 'filterContainer'>
        {keys.map((key, index) => (
          <div key={`filter ${key}, ${index}`} className= 'filter'>
            <div className='radioTitle' key={index}>{key}</div>
            <RadioOptions buttonTitle = {key} />
          </div>
        ))}
      </div>
    );
}

export default FilterButtons;