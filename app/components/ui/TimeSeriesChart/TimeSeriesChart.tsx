"use client";

import type { ApexOptions } from "apexcharts";
import ApexCharts from "react-apexcharts";
import { renderToString } from "react-dom/server";

import type { TimeSeriesGame } from "@common/types";

import Tooltip from "./ToolTip";

// Reason, why to use dynamic import: https://github.com/apexcharts/react-apexcharts/issues/240
// Check also: https://github.com/apexcharts/vue-apexcharts/issues/307

type HeightOptions = "100%" | "75%" | "50%";
type Props = {
  gameData: TimeSeriesGame[];
  dataName: string;
  chartTitle: string;
  height?: HeightOptions;
};

const TimeSeriesChart = ({ gameData, dataName, chartTitle, height }: Props) => {
  const eloData = gameData.map((game) => game.currentElo);

  // Do not show the graph if data includes only one entry (DEFAULT_ELO)
  if (gameData.length <= 1) {
    return (
      <div className="flex h-full items-center justify-center text-5xl font-bold">
        <p>No fargo data available</p>
      </div>
    );
  }

  const black = "#111";
  const white = "#ddd";

  const series: ApexOptions["series"] = [
    {
      name: dataName,
      data: eloData,
    },
  ];

  const options: ApexOptions = {
    // Defines basic chart characteristics
    chart: {
      dropShadow: {
        blur: 4,
        enabled: true,
        opacity: 0.4,
      },
      stacked: false,

      // Toolbar includes zoom, home button, downloading files etdc...
      toolbar: {
        tools: {
          download: false,
        },
      },
      type: "area",
      zoom: {
        type: "x",
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
      type: "gradient",
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
      text: "Missing Fargo Data",
    },

    // Define elo curve characteristics
    stroke: {
      curve: "straight",
      colors: [`${white}`],
      width: 4,
    },

    // Main title
    title: {
      align: "center",
      text: chartTitle,
      offsetY: 20,
      style: {
        color: `${white}`,
        fontSize: "2.4rem",
      },
    },

    // Pops up while hovering over data points and gives info on them
    // Custom example: https://codepen.io/apexcharts/pen/NBdyvV
    // Rendering custom tooltips: https://github.com/apexcharts/react-apexcharts/issues/65
    tooltip: {
      custom: ({ dataPointIndex }) => {
        return renderToString(
          <Tooltip gameData={gameData} dataPointIndex={dataPointIndex} />,
        );
      },
    },

    // X-axis characteristics
    xaxis: {
      type: "numeric",
      decimalsInFloat: 0,
      labels: {
        formatter: (val: string) => {
          return (Number(val) - 1).toFixed(0);
        },
        style: {
          colors: `${white}`,
        },
      },
      title: {
        text: "Game Number",
        style: {
          color: `${white}`,
          fontSize: "2rem",
        },
        offsetY: 100,
      },
    },

    // Y-axis characteristics
    yaxis: {
      labels: {
        formatter: (val: number) => {
          return val.toFixed(0);
        },
        style: {
          colors: `${white}`,
        },
      },
      title: {
        text: "Fargo",
        style: {
          color: `${white}`,
          fontSize: "2rem",
        },
      },
    },
  };
  return (
    <div className="max-h-full">
      <ApexCharts
        options={options}
        type="area"
        series={series}
        height={height}
        width="100%"
      />
    </div>
  );
};

export default TimeSeriesChart;
