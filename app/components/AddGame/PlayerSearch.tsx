import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useEffect } from 'react'
import { Player } from '@common/types'
import useDebounce from 'hooks/useDebounce'

type SearchProps = {
  onSearchDone: (players: Player[]) => void
  onSearchFinished: () => void
}

const PlayerSearch = ({ onSearchDone, onSearchFinished }: SearchProps) => {
  const [query, setQuery] = useDebounce<string>('', 1000)

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player`, {
        params: { query: q },
      })
      onSearchDone(res.data)
    }
    const isEmpty = query.length === 0
    if (!isEmpty) {
      search(query)
    } else {
      onSearchFinished()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div>
      <input onChange={({ target }) => setQuery(target.value)} placeholder="Search for player..." />
    </div>
  )
}

export default PlayerSearch
