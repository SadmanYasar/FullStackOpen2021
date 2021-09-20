import Country from './Country'
const SearchResults = ({filters,setFilters}) => {

    if (filters.length > 10) {
      return(
        <div>
          <p>Too many matches! Specify another filter</p>
        </div>
      )
    }
    
    if (filters.length > 1 && filters.length < 10) {
      return(
        <div>
          {filters.map((filter) => <p key={filter.name} >{filter.name}  <button onClick={() => setFilters([filter])}>show</button> </p>)} 
        </div>
      )
    }
  
    if (filters.length === 1) {
      return(
        <Country filters={filters} />
      )
    }
  
    return(
      <div>
        <p>Waiting for valid input...</p>
      </div>
    )
  }
  export default SearchResults
  