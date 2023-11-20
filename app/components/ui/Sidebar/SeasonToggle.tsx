import React from 'react'

import useSeasonalMode from '@hooks/useSeasonalMode'

import styles from './Sidebar.module.scss'

const SeasonToggle: React.FC = () => {
  const { seasonal, toggleSeasonalMode } = useSeasonalMode()

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.toggleSwitch}>
        <input
          type="checkbox"
          id="toggle"
          className={styles.toggleCheckbox}
          checked={seasonal}
          onChange={toggleSeasonalMode}
        />
        <label htmlFor="toggle" className={styles.toggleLabel}></label>
      </div>
      <span className={styles.toggleLabelText}>Seasonal</span>
    </div>
  )
}

export default SeasonToggle
