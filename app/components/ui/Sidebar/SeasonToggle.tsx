import React from 'react'

import useSeasonalMode from '@hooks/useSeasonalMode'

import styles from './Sidebar.module.scss'

const SeasonToggle: React.FC = () => {
  const { seasonal, toggleSeasonalMode } = useSeasonalMode()

  return (
    <div className={styles.seasonToggleContainer}>
      <label className={styles.seasonToggleLabel}>
        <input
          type="checkbox"
          checked={seasonal}
          onChange={toggleSeasonalMode}
          className={styles.seasonToggleSwitch}
        />
        <span className={styles.seasonToggleSlider}></span>
      </label>
      <span className={styles.seasonToggleText}>
        {seasonal ? 'Seasonal Mode On' : 'Seasonal Mode Off'}
      </span>
    </div>
  )
}

export default SeasonToggle
