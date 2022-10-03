import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useEffect, useState } from 'react'
import { Player } from '@common/types'
import useDelayedCall from 'hooks/useDelayedCall'

type SearchProps = {
  onSearchDone: (players: Player[]) => void
  onSearchActiveChanged: (isActive: boolean) => void
}

const PlayerSearch = ({ onSearchActiveChanged, onSearchDone }: SearchProps) => {
  const [searchActive, setSearchActive] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    onSearchActiveChanged(searchActive)
  }, [searchActive, onSearchActiveChanged])

  const delayedCall = useDelayedCall({ delayMs: 1000 })

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player`, {
        params: { query: q },
      })
      const players = res.data
      onSearchDone(players)
    }

    const isEmpty = query.length === 0
    if (isEmpty && searchActive) {
      setSearchActive(false)
    } else if (!isEmpty && !searchActive) {
      setSearchActive(true)
    } else if (!isEmpty) {
      delayedCall(() => search(query))
    }
  }, [query, delayedCall, searchActive, onSearchDone])

  return (
    <div>
      <input onChange={({ target }) => setQuery(target.value)} placeholder="Search for player..." />
    </div>
  )
}

export default PlayerSearch
