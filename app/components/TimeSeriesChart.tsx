import type { NextPage } from 'next'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic';

// Reason, why to use dynamic import: https://github.com/apexcharts/react-apexcharts/issues/240
// Check also: https://github.com/apexcharts/vue-apexcharts/issues/307
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })
// import Chart from 'react-apexcharts'

type Props = {
  eloData: Array<number>,
  dataName: string,
  chartName: string,
  
}

const TimeSeriesChart: NextPage<Props> = ({ eloData, dataName, chartName }) => {
  const series: ApexOptions["series"] = [{
    name: dataName,
    data: eloData
  }]

  const options: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    colors: ['hsl(210.4,100%,25%)', 'hsl(210.4,100%,70%)'],
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    title: {
      text: chartName,
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
      title: {
        text: 'Elo'
      },
    },
    xaxis: {
      type: 'numeric',
      decimalsInFloat: 0,
      min: 0
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return val.toFixed(0)
        }
      }
    }
  }

  return (
    <div>
      <ApexCharts options={options} type="area" series={series} width={500} />
    </div>
  )
}

export default TimeSeriesChart