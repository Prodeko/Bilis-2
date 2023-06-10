import { GetServerSideProps } from 'next'
import ErrorPage from 'next/error'

import { Player } from '@common/types'
import { isNumber } from '@common/types/guards'
import { NewProfileLayoutInner } from '@components/Layout/NewProfileLayout/Inner'
import { NewProfileLayoutOuter } from '@components/Layout/NewProfileLayout/Outer'
import BackButton from '@components/NewProfile/BackButton'
import ProfileForm from '@components/NewProfile/ProfileForm'
import Header from '@components/ui/Header/Player'
import { getPlayerById } from '@server/db/players'

type ErrorType = {
  error: string
  statusCode: number
}

type Props = Player | ErrorType

const editPlayer = (props: Props) => {
  if ('error' in props) {
    return <ErrorPage title={props.error} statusCode={props.statusCode} />
  }

  return (
    <NewProfileLayoutOuter>
      <Header />
      <NewProfileLayoutInner>
        <BackButton route={`/player/${props.id}`} />
        <ProfileForm player={props} />
      </NewProfileLayoutInner>
    </NewProfileLayoutOuter>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const id = Number(context.query.id) as unknown
  if (!isNumber(id)) {
    return {
      props: {
        error: 'ID must be type of number',
        statusCode: 400,
      },
    }
  }
  const player = await getPlayerById(id)

  if (!player) {
    return {
      props: {
        error: `No player found with ID ${id}`,
        statusCode: 404,
      },
    }
  }

  return { props: { ...player.toJSON() } }
}

export default editPlayer
