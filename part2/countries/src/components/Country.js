import React, { useState, useEffect } from 'react'
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
    },[filters])
  
    if ( Object.keys(weather).length !== 0 ) {
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
                <p>Temperature: {weather.current.temperature}°C</p>
                <img src={weather.current.weather_icons[0]} alt='weatherimg' height={100} width={100}></img>
                <p>Wind {weather.current.wind_speed} mph Direction {weather.current.wind_dir}</p>
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
export default Country  