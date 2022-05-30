import type { PlayerWithoutElo } from '../../../common/types'
import Card from '../../Utility/Card'

const PlayerSearchResult = ({ firstName, lastName, id, favoriteColor }: PlayerWithoutElo) => {
  return (
    <Card cols={3}>
      <div
        style={{ background: favoriteColor }}
        className={`shadow-l w-8 h-8 p-4 rounded-full flex justify-center items-center text-xl`}
      >
        😍
      </div>
      <p className="font-bold">
        {firstName} {lastName[0]}.
      </p>
      <p className="justify-self-end">#{id}</p>
    </Card>
  )
}

export default PlayerSearchResult
