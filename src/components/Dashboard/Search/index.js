import React, { useState } from 'react'
import "./styles.css"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
const Search = ({search , onSearchChange}) => {
  return (
    <div className='search-flex'>
        <SearchRoundedIcon/>
        <input type="text" placeholder='search' value={search} onChange={(e)=>onSearchChange(e)} />
    </div>
  )
}

export default Search