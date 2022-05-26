import type { NextPage } from 'next'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

// Reason, why to use dynamic import: https://github.com/apexcharts/react-apexcharts/issues/240
// Check also: https://github.com/apexcharts/vue-apexcharts/issues/307
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })
// import Chart from 'react-apexcharts'

type Props = {
  eloData: Array<number>
  dataName: string
  chartName: string
  color: string
  height?: number | string
}

const TimeSeriesChart: NextPage<Props> = ({ eloData, dataName, chartName, color, height }) => {
  const series: ApexOptions['series'] = [
    {
      name: dataName,
      data: eloData,
    },
  ]

  const options: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    colors: [color],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.7,
        inverseColors: false,
        gradientToColors: [color],
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [10, 100],
      },
    },
    // markers: {
    //   colors: '#F0F0F2',
    //   size: 2,
    //   strokeWidth: 1,
    //   strokeColors: '#000000'
    // },
    noData: {
      text: 'No data available',
    },
    stroke: {
      curve: 'straight',
      colors: ['#000000'],
      width: 3.5,
    },
    title: {
      text: chartName,
      align: 'left',
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return val.toFixed(1)
        },
      },
    },
    xaxis: {
      type: 'numeric',
      decimalsInFloat: 0,
      labels: {
        formatter: function (val: string) {
          return (Number(val) - 1).toFixed(0)
        },
      },
    },
    grid: {
      padding: {
        left: 10,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0)
        },
      },
      title: {
        text: 'Elo',
      },
    },
  }

  return <ApexCharts options={options} type="area" series={series} height={height} width="100%" />
}

export default TimeSeriesChart
