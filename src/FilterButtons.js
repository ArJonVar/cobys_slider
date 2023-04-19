import React, {useState} from "react";
import './FilterButtons.css';

const FilterButtons = (props) => {
    const data = props.data
    const setFilter = props.setFilter
    const filterState = props.filter

    const firstItem = data[0]
    const keys = Object.keys(firstItem);

    function getUniqueValuesForKey(data, keyName) {
      const values = new Set();
      for (const item of data) {
        values.add(item[keyName]);
      }
      return Array.from(values);
    }

    const handleFilterClick = ({filterKey, filterValue}) => {
      console.log('onclick')
      if(!filterState.hasOwnProperty(filterKey)){
        setFilter({...filterState, [filterKey]: [filterValue]})
      }
      else {
        const updatedState = {...filterState}; // create a new copy of the object
        updatedState[filterKey].push(filterValue); // update the array in the copied object
        setFilter(updatedState); // update the state with the new object
      }
    }

    const handleFilterReset = ({filterKey}) => {
      console.log('reset')
      setFilter({...filterState, [filterKey]: []})
    }

    function RadioOptions({buttonTitle}) {
        const valueArray = getUniqueValuesForKey(data, buttonTitle)
        const resetIndex = valueArray.length + 1
        // console.log(buttonTitle)
        return (
          <div key={`outerdiv ${buttonTitle}`}>
            {valueArray.map((option, index) => (
              <div key={`innerdiv ${index}`}>
                <input type="radio" onClick={() => handleFilterClick({filterKey: buttonTitle, filterValue: option})}
                    name="option" key={`input ${index}`} value={option} />
                <label className = 'option' key={`label ${index}`}>{option}</label>
              </div>
            ))}
            <input type="radio" onClick={() => handleFilterReset({filterKey: buttonTitle})}
              name="option" key={`input ${resetIndex}`} value='reset' />
            <label className = 'option' key={`label ${resetIndex}`}>RESET</label>
          </div>
        );
      }

    console.log(filterState)
    return (
      <div className = 'filterContainer'>
        {keys.map((key, index) => (
          <div key={`filter ${key}, ${index}`} className= 'filter'>
            <label className='radioTitle' key={index}>{key}</label>
            <RadioOptions buttonTitle = {key} />
          </div>
        ))}
      </div>
    );
}

export default FilterButtons;