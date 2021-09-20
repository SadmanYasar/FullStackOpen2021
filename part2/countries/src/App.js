import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SearchResults from './components/SearchResults'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
      switch (searchValue) {
        case "":
          setFilters([])
          break;
      
        default:
          
          //removes white space for each name
          //then turns to lowercase
          //then index compared to -1
          setFilters(countries.filter((country) => 
            country.name
              .split(/\s+/)
              .join('')
              .toLowerCase()
              .indexOf(searchValue
                .split(/\s+/)
                .join('')
                .toLowerCase()) !== -1
          ))
          break;
      }
    }, [searchValue, countries])
  
  const HandleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  

  return(
    <div>
      <div>
        Find Countries <input value={searchValue} onChange={HandleSearch} />
      </div>
      <SearchResults filters={filters} setFilters={setFilters} />

    </div>
  )


}
export default App;
