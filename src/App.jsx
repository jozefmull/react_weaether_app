import { useContext, useEffect } from 'react'
import { GlobalContext } from './context/GlobalState'

import './App.css'
//import Components
import Search from './components/Search'
import CurrentWeather from './components/CurrentWeather'
import MainOptions from './components/MainOptions'
import Loading from './components/Loading'
import ForecastWeather from './components/ForecastWeather'

function App() {
  const { currWeather, loading, getWeather, forecastWeather } =
    useContext(GlobalContext)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let searchData = {
          value: `${position.coords.latitude} ${position.coords.longitude}`,
        }
        getWeather(searchData)
      })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container'>
      <div className='header_wrap'>
        <Search />
        <MainOptions />
      </div>
      <div className='curr_weather_container'>
        {currWeather && <CurrentWeather currWeather={currWeather} />}
        {loading && <Loading />}
      </div>
      <div className='forecast_weather_container'>
        {forecastWeather && (
          <ForecastWeather forecastWeather={forecastWeather} />
        )}
      </div>
    </div>
  )
}

export default App
