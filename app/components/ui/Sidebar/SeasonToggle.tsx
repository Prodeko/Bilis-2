import React, { useContext } from 'react'

import { SeasonalModeContext } from '@state/Season/state'

import styles from './Sidebar.module.scss'

const SeasonToggle: React.FC = () => {
  const { seasonalMode, toggleSeasonalMode } = useContext(SeasonalModeContext)

  return (
    <div className={styles.seasonToggleContainer}>
      <label className={styles.seasonToggleLabel}>
        <input
          type="checkbox"
          checked={seasonalMode}
          onChange={toggleSeasonalMode}
          className={styles.seasonToggleSwitch}
        />
        <span className={styles.seasonToggleSlider}></span>
      </label>
      <span className={styles.seasonToggleText}>
        {seasonalMode ? 'Seasonal Mode On' : 'Seasonal Mode Off'}
      </span>
    </div>
  )
}

export default SeasonToggle
