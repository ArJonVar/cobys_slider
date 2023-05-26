import React, {useState} from "react";
import './FilterButtons.css';

const FilterButtons = (props) => {
    const data = props.data
    const setFilter = props.setFilter
    const filterState = props.filter
    const resetDefaults =props.resetDefaults

    const firstItem = data[0].assets[0]
    const keys = Object.keys(firstItem);
    
    function getUniqueValuesForOuterLevelKey(data, keyName) {
      const values = new Set();
      for (const item of data) {
        values.add(item[keyName]);
      }
      return Array.from(values);
    }
    function getUniqueValuesForAssets(data, keyName, ) {
      const values = new Set();
      for (const project of data) {
        for (const item of project.assets) {
          // weed out nulls
          if(item[keyName][0] !== null){
          values.add(item[keyName]);
          }
      }}
      return Array.from(values);
    }

    const handleFilterClick = ({filterKey, filterValue}) => {
      // if filter object does not have specific filter key, add key/value where value is the specific sub filter clicked
      if(!filterState.hasOwnProperty(filterKey)){
        setFilter({...filterState, [filterKey]: [filterValue]})
      }
      // if filter object has a specific filter key, and already has specific filter value, remove value from array (by making a copy without it and replace it)
      else if(filterState[filterKey].includes(filterValue)){
        const updatedState = {...filterState}; // create a new copy of the object
        const index = updatedState[filterKey].indexOf(filterValue)
        updatedState[filterKey].splice(index, 1)
        setFilter(updatedState)    } 
      //if filter object has key, but not value, add value to array
      else {
        const updatedState = {...filterState}; // create a new copy of the object
        updatedState[filterKey].push(filterValue); // update the array in the copied object
        setFilter(updatedState); // update the state with the new object
      }
    }

    const handleFilterReset = ({filterKey}) => {
      console.log('reset')
      setFilter({...filterState, [filterKey]: []})
      // if key is in resetDefaults, it switches to the Default behvaior
      for(const key in resetDefaults){
        if (key === filterKey){
          setFilter({...filterState, [filterKey]: resetDefaults[filterKey]})
        }
      }
    }

    // useful when value is a list, this turns into a list of list when we pick up all values of one key
    function flattenArray(arrays) {
      const flattened = arrays.reduce((accumulator, currentValue) => {
        return [...accumulator, ...currentValue];
      }, []);
      return [...new Set(flattened)];
    }

    // for putting the filter options in alphabetical order
    function sortArray(list) {
      const alphaSorted = list.sort();
      const numSorted = alphaSorted.sort((a, b) => {
        if (isNaN(a) || isNaN(b)) {
          return 0;
        }
        return a - b;
      });
      return numSorted;
    }


    function RadioOptions({filterKey}) {
        let valueArray = ""
        if (filterKey === 'region'){
          valueArray = getUniqueValuesForOuterLevelKey(data, filterKey)}
        else {
          valueArray = getUniqueValuesForAssets(data, filterKey)}
        let sortedArray = sortArray(valueArray)
        if(Array.isArray(valueArray[0])) {
          valueArray = flattenArray(valueArray)
          sortedArray = sortArray(valueArray)
        }
        const resetIndex = valueArray.length + 1
        return (
          <div key={`outerdiv ${filterKey}`}>
            {sortedArray.map((filterValue, index) => (
              <div key={`nonarray innerdiv ${index}`}>
                <input type="checkbox" 
                  checked = {filterState.hasOwnProperty(filterKey) ? filterState[filterKey].includes(filterValue) : false}
                  onChange= {() => handleFilterClick({filterKey: filterKey, filterValue: filterValue})}
                  name="option" 
                  key={`input ${index}`} 
                  value={filterValue} />
                <label className = 'option' key={`label ${index}`}>{filterValue}</label>
              </div>
            ))}
            <button onClick={() => handleFilterReset({filterKey: filterKey})}
              name="option" key={`input ${resetIndex}`} value='reset'>RESET</button>
          </div>
        );
      }

    return (
      <div className = 'filterContainer'>
        <div key={`filter region, 0`} className= 'filter'>
          <label className='radioTitle' key='0'>region</label>
          <RadioOptions filterKey = 'region' />
        </div>
        {keys.map((key, index) => (
          //set to only map through specific keys in json we care about (based on reset defaults variable)
          <div key={`filter ${key}, ${index}`} className= {`${resetDefaults.hasOwnProperty(key) ? 'filter' : ''}`} >
            {(resetDefaults.hasOwnProperty(key)) &&
            <div>
              <label className='radioTitle' key={index}>{key}</label>
              <RadioOptions filterKey = {key} />
              </div>}
          </div>
        ))}
      </div>
    );
}

export default FilterButtons;