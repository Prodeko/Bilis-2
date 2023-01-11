import { GetServerSideProps } from 'next'
import ErrorPage from 'next/error'

import { Player } from '@common/types'
import { isNumber } from '@common/types/guards'
import NewProfileLayout from '@components/Layout/NewProfileLayout'
import BackButton from '@components/NewProfile/BackButton'
import ProfileForm from '@components/NewProfile/ProfileForm'
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
    <NewProfileLayout>
      <BackButton route={`/player/${props.id}`} />
      <ProfileForm player={props} />
    </NewProfileLayout>
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

  return { props: { player: player.toJSON() } }
}

export default editPlayer
