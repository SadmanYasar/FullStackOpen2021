import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value
    props.filterChange(filter)
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterChange: filter => {
      dispatch(filterChange(filter))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)