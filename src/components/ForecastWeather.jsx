import React, { useContext, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion'

import { MdKeyboardArrowDown } from 'react-icons/md'

import Loading from './Loading'

import { GlobalContext } from '../context/GlobalState'

import styles from '../css/Forecast.module.css'

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const ForecastWeather = () => {
  const { forecastWeather, loading, units } = useContext(GlobalContext)

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

  const formatDate = (date) => {
    let [dateString, time] = date.split(' ')
    let myDate = new Date(dateString)
    let hour = `${time.split(':')[0]}:${time.split(':')[1]}`
    let month = MONTHS[myDate.getMonth()]

    return [myDate.getDate(), month].join('-') + ' ' + hour
  }

  return (
    <>
      <Accordion allowZeroExpanded>
        {forecastWeather.list.slice(0, 13).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className={styles.daily_item}>
                  <label className={styles.day}>
                    {formatDate(item.dt_txt)}
                  </label>
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className={styles.icon_small}
                    alt='weather'
                  />
                  <label className={styles.min_max}>
                    {Math.round(item.main.temp)}
                    {tempUnits}
                  </label>
                  <label className={styles.description}>
                    {item.weather[0].description}
                  </label>
                  <MdKeyboardArrowDown />
                  {loading && <Loading />}
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className={styles.daily_details_grid}>
                <div className={styles.daily_details_grid_item}>
                  <label>Wind:</label>
                  <label>
                    {item.wind.speed} {windUnits}
                  </label>
                </div>
                <div className={styles.daily_details_grid_item}>
                  <label>Humidity:</label>
                  <label>{item.main.humidity} %</label>
                </div>
                <div className={styles.daily_details_grid_item}>
                  <label>Pressure:</label>
                  <label>{item.main.pressure} hPa</label>
                </div>

                <div className={styles.daily_details_grid_item}>
                  <label>Clouds:</label>
                  <label>{item.clouds.all} %</label>
                </div>
                <div className={styles.daily_details_grid_item}>
                  <label>Feels like:</label>
                  <label>
                    {item.main.feels_like}
                    {tempUnits}
                  </label>
                </div>
                <div className={styles.daily_details_grid_item}>
                  <label>Visibility:</label>
                  <label>{Number(item.visibility) / 1000} km</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default ForecastWeather
