import type { NextPage } from 'next'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { MutualStatsPlayer } from '../../common/types'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  player1: MutualStatsPlayer
  player2: MutualStatsPlayer
  height?: number
}

const PieChart: NextPage<Props> = ({ player1, player2, height }) => {
  const winner: MutualStatsPlayer =
    player1.mutualGamesWon > player2.mutualGamesWon ? player1 : player2
  const loser: MutualStatsPlayer =
    player1.mutualGamesWon <= player2.mutualGamesWon ? player1 : player2

  const series: ApexOptions['series'] = [loser.mutualGamesWon, winner.mutualGamesWon]

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    colors: [loser.favoriteColor, winner.favoriteColor],
    // fill: {
    //   type: 'gradient',
    // },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        gradientToColors: [loser.favoriteColor, winner.favoriteColor],
        inverseColors: true,
        opacityFrom: 0.6,
        opacityTo: 1,
        // stops: [10, 90, 100]
      },
    },
    labels: [loser.name, winner.name],
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
    },
  }

  return <ApexCharts options={options} type="pie" series={series} height={height} width="90%" />
}

export default PieChart
