import { QueueInfo } from '../../../common/types'
import Card from '../../Utility/Card'
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
    <Card id={id} cols={6}>
      <p>{`${rank}.`}</p>
      <div style={{ background: favoriteColor }} className={`text-center text-xl`}>
        😍
      </div>
      <p className="flex justify-center">{nickname}</p>
      <p>{`#${id}`}</p>
      <p>{time.toString().slice(11, 16)}</p>
      <div className="flex justify-center">
        {/*Link to homepage bcs playercard already a link, so clicking the trash icon would take to the playersite.  */}
        <Link href="/" passHref>
          <FiTrash2 className="hover:scale-110 self-center" onClick={() => handleRemove(id)} />
        </Link>
      </div>
    </Card>
  )
}

export default QueueItem
