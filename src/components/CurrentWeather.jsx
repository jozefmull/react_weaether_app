import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

import styles from '../css/CurrentWeather.module.css'

const CurrentWeather = () => {
  const { units, currWeather, loading } = useContext(GlobalContext)

  let { city, main, weather, wind, visibility, clouds, name, rain, snow } =
    currWeather

  const [tempUnits, settempUnits] = useState('°C')
  const [windUnits, setwindUnits] = useState('m/s')

  useEffect(() => {
    if (units === 'metric') {
      settempUnits('°C')
      setwindUnits('m/s')
    } else if (units === 'imperial') {
      settempUnits('°F')
      setwindUnits('mph')
    }
  }, [units])

  return (
    <div
      className={styles.current_weather}
      style={{ filter: loading ? 'blur(3px)' : '' }}
    >
      <div className={styles.top}>
        <div>
          <h2>{city ? city : `${name}, ${currWeather.sys.country}`}</h2>
          <p className={styles.weather_desc}>
            {weather[0].main}, {weather[0].description}
          </p>
        </div>
        <img
          alt='weather-icon'
          className={styles.weather_icon}
          src={`icons/${weather[0].icon}.png`}
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.temperatur}>{`${Math.round(
          main.temp
        )}${tempUnits}`}</p>
        <span>
          Feels like: {Math.round(main.feels_like)}
          {tempUnits}, Max temp: {main.temp_max}
          {tempUnits}, Min temp: {main.temp_min}
          {tempUnits}
        </span>
        <div className={styles.details}>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Wind: </span>
            <span className={styles.parameter_value}>
              {wind.speed} {windUnits}{' '}
              <svg
                viewBox='0 0 1000 1000'
                style={{ transform: `rotate(${wind.deg}deg)` }}
              >
                <g fill='#48484a'>
                  <path d='M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z'></path>
                  <path d='M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z'></path>
                </g>
              </svg>
            </span>
          </div>
          {wind.gust !== 0 && (
            <div className={styles.parameter_row}>
              <span className={styles.parameter_label}>Gust: </span>
              <span className={styles.parameter_value}>
                {wind.gust} {windUnits}
              </span>
            </div>
          )}

          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Humidity: </span>
            <span className={styles.parameter_value}>{main.humidity} %</span>
          </div>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Pressure: </span>
            <span className={styles.parameter_value}>{main.pressure} hPa</span>
          </div>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Visibility: </span>
            <span className={styles.parameter_value}>
              {Number(visibility) / 1000} km
            </span>
          </div>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Clouds: </span>
            <span className={styles.parameter_value}>
              {Number(clouds.all)} %
            </span>
          </div>
          {rain && rain.hasOwnProperty('1h') && (
            <div className={styles.parameter_row}>
              <span className={styles.parameter_label}>Rain: </span>
              <span className={styles.parameter_value}>
                {Number(rain['1h'])} mm
              </span>
            </div>
          )}
          {snow && snow.hasOwnProperty('1h') && (
            <div className={styles.parameter_row}>
              <span className={styles.parameter_label}>Snow: </span>
              <span className={styles.parameter_value}>
                {Number(snow['1h'])} mm
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
