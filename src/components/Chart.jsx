import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const Chart = () => {
  const { forecastWeather, units } = useContext(GlobalContext)

  const [tempUnits, settempUnits] = useState('°C')

  let myData = []

  forecastWeather.list.slice(0, 20).forEach((item) => {
    myData.push({
      time: `${item.dt_txt.split(' ')[1].split(':')[0]}:${
        item.dt_txt.split(' ')[1].split(':')[1]
      }`,
      temp: item.main.temp,
      rain: item.rain ? item.rain['3h'] : 0,
    })
  })

  useEffect(() => {
    if (units === 'metric') {
      settempUnits('°C')
    } else if (units === 'imperial') {
      settempUnits('°F')
    }
  }, [units])

  return (
    <ComposedChart
      width={530}
      height={300}
      data={myData}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid stroke='#f5f5f5' strokeDasharray='10 10' />
      <XAxis
        dataKey='time'
        style={{ fontSize: '12px' }}
        tickLine={true}
        axisLine={{ stroke: '#f5f5f5' }}
        angle={-10}
        interval={1}
      />

      <Tooltip />
      <Bar
        radius={[3, 3, 0, 0]}
        dataKey='rain'
        barSize={20}
        fill='#88d1c6'
        yAxisId='left'
        name='Rain'
        opacity={0.7}
      />
      <Line
        dot={false}
        strokeWidth={2}
        strokeLinecap='round'
        type='monotone'
        dataKey='temp'
        stroke='#eb6e4b'
        yAxisId='right'
        name='Temp'
      />
      <YAxis
        tickLine={false}
        yAxisId='right'
        axisLine={{ stroke: 'transparent' }}
        unit={tempUnits}
        stroke='#eb6e4b'
        style={{ fontSize: '12px' }}
        tickCount={4}
      />
      <YAxis
        tickLine={false}
        yAxisId='left'
        orientation='right'
        stroke='#88d1c6'
        axisLine={{ stroke: 'transparent' }}
        unit=' mm'
        style={{ fontSize: '12px' }}
        tickCount={4}
      />
    </ComposedChart>
  )
}

export default Chart
