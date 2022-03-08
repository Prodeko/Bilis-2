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
    colors: ['#EF2121', '#008000'],
    fill: {
      type: 'gradient',
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
    <div className='w-1/2' >
      <ApexCharts options={options} type='pie' series={series} />
    </div>
  )
}

export default PieChart