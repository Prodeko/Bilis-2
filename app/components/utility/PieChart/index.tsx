"use client"

import { ApexOptions } from 'apexcharts'

import type { MutualGames, Player } from '@common/types'

import styles from './PieChart.module.scss'

// import dynamic from 'next/dynamic'
// const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })
import ApexCharts from 'react-apexcharts'

type Props = {
  currentPlayer: Player
  opposingPlayer: Player
  mutualGames: MutualGames
}

const PieChart = ({ currentPlayer, opposingPlayer, mutualGames }: Props) => {
  if (mutualGames.currentPlayerGamesWon === 0 && mutualGames.opposingPlayerGamesWon === 0) {
    return <div className={styles.nogames}>No matches between these two players</div>
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyApexCharts = ApexCharts as any // TODO: Temp fix

  // const black = '#111'
  const white = '#ddd'

  const series: ApexOptions['series'] = [
    mutualGames.currentPlayerGamesWon,
    mutualGames.opposingPlayerGamesWon,
  ]

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    colors: ['#033969', '#667085'],
    dataLabels: {
      style: {
        fontSize: '2.4rem',
      },
    },
    // fill: {
    //   type: 'gradient',
    // },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        gradientToColors: ['#0a4275', '#98a2b3'],
        inverseColors: true,
        opacityFrom: 0.7,
        opacityTo: 1,
        // stops: [10, 90, 100]
      },
    },
    labels: [currentPlayer.firstName, opposingPlayer.firstName],
    legend: {
      labels: {
        colors: white,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    grid: {
      padding: {
        left: 10,
      },
    },
    title: {
      text: 'Mutual Games',
      offsetY: 20,
      style: {
        color: `${white}`,
        fontSize: '2.4rem',
      },
    },
  }
  return <AnyApexCharts options={options} type="pie" series={series} height="90%" width="100%" />
}

export default PieChart
