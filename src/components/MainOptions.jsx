import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

import { MdNearMe } from 'react-icons/md'

import styles from '../css/MainOptions.module.css'

const MainOptions = () => {
  const { changeUnits, getWeather, searchData, units } =
    useContext(GlobalContext)

  useEffect(() => {
    if (searchData) {
      getWeather(searchData)
    }
    // eslint-disable-next-line
  }, [units])

  const handleClick = (e) => {
    changeUnits(e.target.value)
  }

  const handleGetCurrPosWeather = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let searchData = {
          value: `${position.coords.latitude} ${position.coords.longitude}`,
        }
        getWeather(searchData)
      })
    }
  }

  return (
    <div className={styles.main_opt_wrap}>
      <button onClick={() => handleGetCurrPosWeather()}>
        <MdNearMe />
      </button>
      <div className={styles.units_wrap}>
        <button
          value='metric'
          onClick={(e) => handleClick(e)}
          className={units === 'metric' ? styles.active : ''}
        >
          Metric: °C, m/s
        </button>
        <button
          value='imperial'
          onClick={(e) => handleClick(e)}
          className={units === 'imperial' ? styles.active : ''}
        >
          Imperial: °F, mph
        </button>
      </div>
    </div>
  )
}

export default MainOptions
