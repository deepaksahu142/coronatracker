import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([])
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }
    fetchAPI();
  }, [])

  const lineChart = (
    dailyData.length > 0
      ? (<Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              label: 'Infected',
              fill: true,
              lineTension: 0.5,
              backgroundColor: 'rgba(0,0,255,0.5)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: dailyData.map(({ confirmed }) => confirmed),

            },
            {
              label: 'Deaths',
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'rgba(75,180,185,1)',
              borderColor: 'red',
              borderWidth: 2,
              data: dailyData.map(({ deaths }) => deaths)
            }
          ]
        }} />
      ) : null
  )

  const barChart = (
    confirmed
      ? <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: [
              'rgba(0,0,255,0.5)',
              'rgba(0,255,0,0.5)',
              'rgba(255,0,0,0.5)'
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }]
        }}
        width={100}
        height={50}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` }
        }}
      />
      : null
  )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}
export default Chart;