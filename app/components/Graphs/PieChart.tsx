import type { NextPage } from 'next'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic';
import { MutualStatsPlayer } from '../../common/types';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  player1: MutualStatsPlayer,
  player2: MutualStatsPlayer
}

const PieChart: NextPage<Props> = ({ player1, player2 }) => {
  const winner: MutualStatsPlayer = player1.mutualGamesWon > player2.mutualGamesWon ? player1 : player2
  const loser: MutualStatsPlayer = player1.mutualGamesWon <= player2.mutualGamesWon ? player1 : player2

  const series: ApexOptions['series'] =[loser.mutualGamesWon, winner.mutualGamesWon]

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
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    title: {
      text: 'Mutual Games'
    }
  }

  return (
    <div className='h-96 w-5/6 px-20'>
      <ApexCharts options={options} type='pie' series={series} height="100%" />
    </div>
  )
}

export default PieChart