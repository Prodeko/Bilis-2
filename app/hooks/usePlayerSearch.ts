import { useEffect, useState } from 'react'
import type { PlayerMeta } from '../common/types'

const baseUrl = '/api/players/search?keywords='

function usePlayerSearch(searchString: string): PlayerMeta[] {
  const [searchResult, setSearchResult] = useState<PlayerMeta[]>([])

  const searchUrl = `${baseUrl}?${encodeURIComponent(searchString)}`
  
  useEffect(() => {
    ;(async () => {
      const response = await fetch(searchUrl)
      const result = (await response.json()) as PlayerMeta[]
      setSearchResult(result)
    })()
  }, [searchUrl])

  return searchResult
}

export default usePlayerSearch
