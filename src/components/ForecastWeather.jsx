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
        {forecastWeather.list.slice(0, 13).map((item, id) => (
          <AccordionItem key={id}>
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
                    <svg
                      viewBox='0 0 1000 1000'
                      style={{ transform: `rotate(${item.wind.deg}deg)` }}
                    >
                      <g fill='#48484a'>
                        <path d='M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z'></path>
                        <path d='M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z'></path>
                      </g>
                    </svg>
                  </label>
                </div>
                <div className={styles.daily_details_grid_item}>
                  <label>Gust:</label>
                  <label>{item.wind.gust}</label>
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
                {item.rain && (
                  <div className={styles.daily_details_grid_item}>
                    <label>Rain:</label>
                    <label>{Number(item.rain['3h'])} mm</label>
                  </div>
                )}
                {item.pop !== 0 && (
                  <div className={styles.daily_details_grid_item}>
                    <label>Percipitation:</label>
                    <label>{Number(item.pop) * 100} %</label>
                  </div>
                )}
                {item.snow && (
                  <div className={styles.daily_details_grid_item}>
                    <label>Snow:</label>
                    <label>{Number(item.snow)}</label>
                  </div>
                )}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default ForecastWeather
