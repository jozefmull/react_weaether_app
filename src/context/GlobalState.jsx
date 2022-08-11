import React, { createContext, useReducer } from 'react'
import { AppReducer } from './AppReducer'

import { WEATHER_API_URL, WEATHER_API_KEY } from '../API'

const initialState = {
  loading: false,
  units: 'metric',
  currWeather: null,
  forecastWeather: null,
  searchData: null,
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const changeUnits = (units) => {
    dispatch({ type: 'CHANGE_UNITS', payload: units })
  }

  const getWeather = (searchData) => {
    dispatch({ type: 'LOADING' })
    // we get lat and long values from our search object
    const [lat, long] = searchData.value.split(' ')

    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=${state.units}`
    )

    // https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    const forecastWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=${state.units}`
    )

    // resolve fetch promises and set current state of current and forecast weather
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (res) => {
        const currentWeatherRes = await res[0].json()
        const forecastWeatherRes = await res[1].json()

        dispatch({
          type: 'GET_WEATHER',
          payload: [currentWeatherRes, forecastWeatherRes, searchData],
        })
      })
      // if error console log that error
      .catch((err) => console.log(err))
  }

  return (
    <GlobalContext.Provider
      value={{
        loading: state.loading,
        units: state.units,
        currWeather: state.currWeather,
        forecastWeather: state.forecastWeather,
        searchData: state.searchData,
        changeUnits,
        getWeather,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
