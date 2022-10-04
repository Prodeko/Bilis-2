import { ApexOptions } from 'apexcharts'
import styles from './TimeSeriesChart.module.scss'
import dynamic from 'next/dynamic'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

// Reason, why to use dynamic import: https://github.com/apexcharts/react-apexcharts/issues/240
// Check also: https://github.com/apexcharts/vue-apexcharts/issues/307

type HeightOptions = '100%' | '75%' | '50%'

type Props = {
  data: number[]
  dataName: string
  chartTitle: string
  height?: HeightOptions
}

const TimeSeriesChart = ({ data, dataName, chartTitle, height }: Props) => {
  // Do not show the graph if data includes only one entry (DEFAULT_ELO)
  if (data.length <= 1) {
    return (
      <div className={styles.nodata}>
        <p>No elo data available</p>
      </div>
    )
  }

  const black = '#111'
  const white = '#eee'

  const series: ApexOptions['series'] = [
    {
      name: dataName,
      data,
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
      colors: [`${black}`],
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
    tooltip: {
      style: {
        fontSize: '1.6rem',
      },
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        formatter: function (val: number) {
          return val.toFixed(1)
        },
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

  return <ApexCharts options={options} type="area" series={series} height={height} width="100%" />
}

export default TimeSeriesChart
