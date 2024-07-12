
import './App.css';
import { get } from './utills/utills';
import { useState } from 'react'

export const App = () => {
  const defaultOptions = ['Name','Email', 'Phone', 'Age', 'UUID', 'Favourite Animal'] // array of options selectable in a dropdown
  const [options, setOptions] = useState(defaultOptions)
  const [selectedColumn, setSelectedColumn] = useState(options[0])
  const [rowHeaders, setRowHeaders] = useState([]);
  const [length, setLength] = useState(1)
  const [toggle, setToggle] = useState(false)
  const addColumn = () => { // adding columns to declared state above 
    if (selectedColumn === undefined) { // added undefined to the selected columns when list had been depleted 
      return
    }
    const filtereredList = options.filter((option)=> option !== selectedColumn)
    setRowHeaders([...rowHeaders, selectedColumn.toLowerCase()])
    setOptions(filtereredList)
    setSelectedColumn(filtereredList[0])
  }
  const removeColumn = (headerToRemove) => {
    const newList = [...options, headerToRemove]
    setOptions(newList)
    setRowHeaders(rowHeaders.filter((header) => header !== headerToRemove))
   setSelectedColumn(newList[0]) // 
  }
  const isDisabled = options.length === 0;

  return (
    <div className='page-wrapper'>
        <h1 className="heading-1">
          Wicked cool CSV Maker 9000
        </h1>
        <div className='length-input'>
          <label id='csv-label'>CSV Length between 1 - 500,000,000</label>
          <input id='input-label' aria-label='csv length' type='number' value={length} min={1} max={500000000} onChange={(evt) => setLength(evt.target.value)}></input>
        </div>
        <div className='header-option' >
          <select id='header-option-select' onChange={(evt) => setSelectedColumn(evt.target.value)}>
            {options.map((option) => <option key={option}>{option}</option>)}
          </select>
          <button
            disabled={isDisabled}
            id='header-option-add'
            onClick={() => addColumn()}>
            Add Column Header
          </button>
        </div>
    <div className='selected-headers-list'>
      {rowHeaders.map((option, optionIdx) =>
      <div id='selected-column-header-row'>
        <div id='column-header'
        key={`${optionIdx}-${option}`}>
          {option}
        </div>
        <button
          id='header-option-remove'
          onClick={() => removeColumn(option)}>
          {`Remove ${option}`}
        </button>
      </ div>
        )}
        </div>

    <fieldset className='toggle'> 
      <legend> Unique data or identical data
      </legend>
      <div>    <input onChange={() => setToggle(!toggle)} type="checkbox" id="unique" name="unique" checked={toggle} />
      <label>Unique</label>
      </div>
    </fieldset>


     <button id="action" onClick={() => get(rowHeaders, length, toggle)}>Download csv</button> 
    </ div>
  ); // button used to download csv
}


  
