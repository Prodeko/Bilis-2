import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { renderToString } from 'react-dom/server'
import type { TimeSeriesGame } from '@common/types'
import Tooltip from './ToolTip'

import styles from './TimeSeriesChart.module.scss'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

// Reason, why to use dynamic import: https://github.com/apexcharts/react-apexcharts/issues/240
// Check also: https://github.com/apexcharts/vue-apexcharts/issues/307

type HeightOptions = '100%' | '75%' | '50%'
type Props = {
  gameData: TimeSeriesGame[]
  dataName: string
  chartTitle: string
  height?: HeightOptions
}

const TimeSeriesChart = ({ gameData, dataName, chartTitle, height }: Props) => {
  const AnyApexCharts = ApexCharts as any // TODO: Temp fix

  const eloData = gameData.map(game => game.currentElo)

  // Do not show the graph if data includes only one entry (DEFAULT_ELO)
  if (gameData.length <= 1) {
    return (
      <div className={styles.nodata}>
        <p>No elo data available</p>
      </div>
    )
  }

  const black = '#111'
  const white = '#ddd'

  const series: ApexOptions['series'] = [
    {
      name: dataName,
      data: eloData,
    },
  ]

  const options: ApexOptions = {
    // Defines basic chart characteristics
    chart: {
      dropShadow: {
        blur: 4,
        enabled: true,
        opacity: 0.2,
      },
      stacked: false,
      toolbar: {
        autoSelected: 'zoom',
      },
      type: 'area',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
    },

    // Main color of the chart
    colors: [`${black}`],

    // Disable speech bubble on the markers
    dataLabels: {
      enabled: false,
    },

    // Fill the gradient under the elo curve
    fill: {
      type: 'gradient',
      colors: [`${white}`],
      gradient: {
        shadeIntensity: 0.7,
        inverseColors: false,
        gradientToColors: [`${white}`],
        opacityFrom: 0.7,
        opacityTo: 0.4,
      },
    },

    // Defines markers on the data points - disabled since they don't work well with zoom
    // markers: {
    //   colors: '#F0F0F2',
    //   size: 2,
    //   strokeWidth: 1,
    //   strokeColors: '#000000',
    // },

    // Define what happens when the data is missing
    noData: {
      text: 'Missing Elo Data',
    },

    // Define elo curve characteristics
    stroke: {
      curve: 'straight',
      colors: [`${white}`],
      width: 4,
    },

    // Main title
    title: {
      align: 'center',
      text: chartTitle,
      offsetY: 20,
      style: {
        color: `${white}`,
        fontSize: '2.4rem',
      },
    },

    // Pops up while hovering over data points and gives info on them
    // Custom example: https://codepen.io/apexcharts/pen/NBdyvV
    // Rendering custom tooltips: https://github.com/apexcharts/react-apexcharts/issues/65
    tooltip: {
      custom: function ({ dataPointIndex }) {
        return renderToString(<Tooltip gameData={gameData} dataPointIndex={dataPointIndex} />)
      },
    },

    // X-axis characteristics
    xaxis: {
      type: 'numeric',
      decimalsInFloat: 0,
      labels: {
        formatter: function (val: string) {
          return (Number(val) - 1).toFixed(0)
        },
        style: {
          colors: `${white}`,
        },
      },
      title: {
        text: 'Game Number',
        style: {
          color: `${white}`,
          fontSize: '2rem',
        },
        offsetY: 100,
      },
    },

    // Y-axis characteristics
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0)
        },
        style: {
          colors: `${white}`,
        },
      },
      title: {
        text: 'Elo',
        style: {
          color: `${white}`,
          fontSize: '2rem',
        },
      },
    },
  }
  return (
    <div className={styles.chart}>
      <AnyApexCharts options={options} type="area" series={series} height={height} width="100%" />
    </div>
  )
}

export default TimeSeriesChart
