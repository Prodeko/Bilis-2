import { QueueInfo } from '../common/types'
import PlayerCard from './PlayerCard'
import { FiTrash2 } from 'react-icons/fi'
import useQueue from '../hooks/useQueue'

interface Props extends QueueInfo {
  handleRemove: (id: QueueInfo['id']) => void
}
const QueueItem = ({
  id,
  firstName,
  lastName,
  nickname,
  favoriteColor,
  handleRemove,
}: Props) => {
  return (
    <PlayerCard selected={false}>
      <h5>{nickname}</h5>
      <h5>{id}</h5>
      <h5>{favoriteColor}</h5>
      <FiTrash2 onClick={() => handleRemove(id)} />
    </PlayerCard>
  )
}

export default QueueItem
