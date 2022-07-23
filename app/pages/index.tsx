import type { NextPage } from 'next'
import { GameListItem, Player } from '../common/types'
import Button from '@atoms/Button'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Tervetuloa Bilikseen!</h1>
      <Button onClick={() => 'nothing'} variations={['btn__winner']}>
        Voittaja
      </Button>
      <Button onClick={() => 'nothing'} variations={['btn__underTable']}>
        Pöydän alle
      </Button>
    </div>
  )
}

export default Home
