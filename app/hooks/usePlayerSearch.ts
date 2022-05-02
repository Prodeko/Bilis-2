import { useEffect, useState } from 'react'
import type { PlayerMeta, PlayerWithoutElo } from '../common/types'

const baseUrl = '/api/players/search?keywords='

function usePlayerSearch(searchString: string): PlayerWithoutElo[] {
  const [searchResult, setSearchResult] = useState<PlayerWithoutElo[]>([])

  const searchUrl = `${baseUrl}?${encodeURIComponent(searchString)}`
  
  useEffect(() => {
    ;(async () => {
      const response = await fetch(searchUrl)
      const result = (await response.json()) as PlayerWithoutElo[]
      result.forEach(p => p.nickname = p.nickname || 'placeholder')
      setSearchResult(result)
    })()
  }, [searchUrl])
  return searchResult
}

export default usePlayerSearch
