import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Country = ({filters}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    let isMounted = true

    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: filters[0].capital
    }
    axios
      .get('http://api.weatherstack.com/current',{params})
      .then((response) => {
        if (isMounted) {
          setWeather(response.data)
        }
      })
      .catch((error) => console.log(error))
    
    return () => isMounted = false

  },[weather,filters])

  if ( weather.length > 0 ) {
    return(
      <div>
          {filters.map((filter) => {
            return(
              <div key={filter.name}>
              <h1>{filter.name}</h1>
              <p>Capital: {filter.capital} </p>
              <p>Population: {filter.population} </p>
              <p><b>Languages</b></p>
              <ul>
                {filter.languages.map((language) => <li key={language.name}>{language.name}</li>)}
              </ul>
              <img src={filter.flag} alt='flagimg' height={200} width={200}></img>
              <h3>Weather in {filter.capital}</h3>
              <p>Temperature: {weather[0].current.temperature}</p>
              <img src={weather[0].current.weather_icons[0]} alt='weatherimg' height={200} width={200}></img>
              <p>Wind {weather[0].current.wind_speed} mph Direction {weather[0].current.wind_dir}</p>
              </div>
            )
          })}
        </div>
    )
  }

  return(
    <div>
        {filters.map((filter) => {
          return(
            <div key={filter.name}>
            <h1>{filter.name}</h1>
            <p>Capital: {filter.capital} </p>
            <p>Population: {filter.population} </p>
            <p><b>Languages</b></p>
            <ul>
              {filter.languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={filter.flag} alt='flagimg' height={200} width={200}></img>
            </div>
          )
        })}
      </div>
  )
}

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
