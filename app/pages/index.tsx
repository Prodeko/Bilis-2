import type { NextPage } from 'next'
import { GameListItem, Player } from '../common/types'
import Button from '@atoms/Button'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Tervetuloa Bilikseen!</h1>
      <Button onClick={() => 'nothing'} variation="positive">
        Voittaja
      </Button>
      <Button onClick={() => 'nothing'} variation="negative">
        Pöydän alle
      </Button>
    </div>
  )
}

const fetchLeaderboard = async () => {
  const endpoint = `http://localhost:3000/api/players/leaderboard`
  const response = await fetch(endpoint)
  const result = (await response.json()) as Player[]
  return result
}

const fetchLatestGames = async () => {
  const endpoint = `http://localhost:3000/api/games/latest`
  const response = await fetch(endpoint)
  const result = (await response.json()) as GameListItem[]
  return result
}

export async function getServerSideProps() {
  const [leaderboard, recents] = await Promise.all([fetchLeaderboard(), fetchLatestGames()])
  return {
    props: { leaderboard, recents }, // will be passed to the page component as props
  }
}

export default Home
