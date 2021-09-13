import React from 'react'

const PersonForm = ({onSubmit, name, nameOnChange, number, numberOnChange}) => 
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={nameOnChange}/>
    </div>
    <div>
      number: <input value={number} onChange={numberOnChange}  />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
export default PersonForm