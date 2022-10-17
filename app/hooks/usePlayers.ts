import axios from 'axios'
import { useEffect, useState } from 'react'

import { Player } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'

const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`${NEXT_PUBLIC_API_URL}/player?query=${query}`)
        setPlayers(result.data as Player[])
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }

    fetch()
  }, [query])

  return { players, query, setQuery }
}

export default usePlayers
