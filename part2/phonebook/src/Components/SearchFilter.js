import React from 'react'

const SearchFilter = ({value, onChange}) => 
  <div>
  Filter shown with: <input value={value} onChange={onChange}/>
  </div>
export default SearchFilter