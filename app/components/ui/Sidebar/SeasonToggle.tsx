import React from 'react'

import useSeasonalMode from '@hooks/useSeasonalMode'

import styles from './Sidebar.module.scss'

const SeasonToggle: React.FC = () => {
  const seasonalMode = useSeasonalMode()

  return (
    <div className={styles.seasonToggleContainer}>
      <label className={styles.seasonToggleLabel}>
        <input
          type="checkbox"
          checked={seasonalMode}
          onChange={() => console.log('toggle')}
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
