import React from 'react'

const Total = ({ parts }) => {
    const excercises = parts.map((part) => part.exercises)
    const sum = excercises.reduce((s,p) => {
      return s+p 
    })
    return(
      <p><b>Number of exercises {sum}</b></p>
    ) 
  }
  export default Total
