'use client'

import React, { ReactNode, createContext, useState } from 'react'

interface SeasonalModeContextProps {
  seasonalMode: boolean
  toggleSeasonalMode: () => void
}

export const SeasonalModeContext = createContext<SeasonalModeContextProps>({
  seasonalMode: false,
  toggleSeasonalMode: () => {},
})

export const SeasonalModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [seasonalMode, setSeasonalMode] = useState(false)

  const toggleSeasonalMode = () => {
    setSeasonalMode(!seasonalMode)
  }

  return (
    <SeasonalModeContext.Provider value={{ seasonalMode, toggleSeasonalMode }}>
      {children}
    </SeasonalModeContext.Provider>
  )
}
