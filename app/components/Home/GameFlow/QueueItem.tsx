import { QueueInfo } from '../../../common/types'
import Card from './Card'
import { FiTrash2 } from 'react-icons/fi'
import Link from 'next/link'

interface Props extends QueueInfo {
  handleRemove: (id: QueueInfo['id']) => void
  rank: number
  first?: boolean
}
const QueueItem = ({
  id,
  firstName,
  lastName,
  nickname,
  favoriteColor,
  time,
  rank,
  handleRemove,
  first,
}: Props) => {
  return (
    <Card selected={false} id={id}>
      <h5>{`${rank}.`}</h5>
      <div
        style={{ background: favoriteColor }}
        className={`shadow-l w-8 h-8 p-4 rounded-full flex justify-center items-center text-xl`}
      >
        😍
      </div>
      <h5>{nickname}</h5>
      <h5>{`#${id}`}</h5>
      <h5>{time.toString().slice(11, 16)}</h5>
      {/*Link to homepage bcs playercard already a link, so clicking the trash icon would take to the playersite.  */}
      <Link href="/" passHref>
        <FiTrash2
          className="hover:scale-110"
          onClick={() => handleRemove(id)}
        />
      </Link>
    </Card>
  )
}

export default QueueItem
