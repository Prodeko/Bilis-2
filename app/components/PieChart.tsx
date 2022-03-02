import type { NextPage } from 'next'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

// WIP, need to make a global class later
type Player = {
  mutualGamesWon: number,
  name: string
}

type Props = {
  player1: Player,
  player2: Player
}

const PieChart: NextPage<Props> = ({ player1, player2 }) => {
  const series: ApexOptions['series'] = [player1.mutualGamesWon, player2.mutualGamesWon]

  const options: ApexOptions = {
    chart: {
      width: '100%',
      type: 'pie',
    },
    fill: {
      type: 'gradient'
    },
    labels: [player1.name, player2.name],
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
    <div className='w-1/2'>
      <ApexCharts options={options} type='pie' series={series} />
    </div>
  )
}

export default PieChart