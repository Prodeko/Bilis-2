"use client"

import PieChart from '@ui/PieChart'
import PlayerSearchSelect from '@ui/PlayerSearch/PlayerSearchSelect'
import { useState } from 'react'

import type { PieChartProps } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import styles from './ProfileCharts.module.scss'

const PlayerComparison = ({ currentPlayerId }: { currentPlayerId: number }) => {
  const [pieChartProps, setPieChartProps] = useState<PieChartProps | undefined>(undefined)
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({ duration: 400 })

  return (
    <div ref={parent} className={styles.pieContainer}>
      <PlayerSearchSelect currentPlayerId={currentPlayerId} setPieChartProps={setPieChartProps} />
      {pieChartProps && <PieChart {...pieChartProps} />}
    </div>
  )
}

export default PlayerComparison
