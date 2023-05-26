import React, {useState} from "react";
import './FilterButtons.css';

const FilterButtons = (props) => {
    const data = props.data
    const setFilter = props.setFilter
    const filterState = props.filter

    const firstItem = data[0]
    const keys = Object.keys(firstItem);

    keys.map(item => (
        setFilter({...filterState, [item]:[]})
    ))

    function getUniqueValuesForKey(data, keyName) {
      const values = new Set();
      for (const item of data) {
        values.add(item[keyName]);
      }
      return Array.from(values);
    }

    const appendFilter = ({newFilter, filterKey}) => {
        if (filterState.filterKey === 0 ) {
        const updatedState= {...filterState}; // create a new copy of the object
        updatedState.filterKey.push(newFilter); // update the array in the copied object
        setFilter(updatedState); // update the state with the new object
        }
      };

    function RadioOptions({buttonTitle}) {
        const valueArray = getUniqueValuesForKey(data, buttonTitle)
        // console.log(buttonTitle)
        return (
          <div key={`outerdiv ${buttonTitle}`}>
            {valueArray.map((option, index) => (
              <div key={`innerdiv ${index}`}>
                <input type="radio" onClick={appendFilter(option, buttonTitle)}
                    name="option" key={`input ${index}`} value={option} />
                <label className = 'option' key={`label ${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      }

    function MultiSelect({buttonTitle}) {
      const valueArray = getUniqueValuesForKey(data, buttonTitle)
      console.log(buttonTitle)
      return (
        <select id={`outerdiv ${buttonTitle}`} key={`outerdiv ${buttonTitle}`} multiple>
          {valueArray.map((option, index) => (
            <div key={`innerdiv ${index}`}>
                <option 
                // onClick={() => setFilter({...filter, [buttonTitle]: option})}
                // name="option" key={`input ${index}`} 
                value={option}>
                    {option}
                </option>
            </div>
          ))}
        </select>
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