import React from 'react'
import { useGlobalContext } from '../context';
import classes from './FilterForm.module.css';


function FilterForm() {
    const {query, handleSearch} = useGlobalContext();
  return (
    <form className={classes['search-form']} onSubmit={(e)=> e.preventDefault()}>
        <h2>Filter Customer Data</h2>
        <input 
            type='text'
            className={classes['form-input']}
            value={query}
            onChange={(e)=> handleSearch(e.target.value)}
        />
    </form>
  )
}

export default FilterForm
