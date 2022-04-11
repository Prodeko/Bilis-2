import Link from "next/link"
import { Player, PlayerMeta } from "../../../common/types"

type Props = {
  selected?: boolean
  id?: PlayerMeta['id']
  children: JSX.Element[]
}

const Card = ({ selected, id, children }: Props): JSX.Element => {
  if(!id) {
    return (
      <div className={`bg-white m-6 shadow-xl py-4 rounded-md grid grid-cols-8 items-center text-center gap-5 transition-all`}>
        {children}
      </div>
    )
  }
  return (
    <Link href={`/players/${id}`} passHref>
      <div
        className={`bg-white m-6 shadow-xl hover:scale-[1.01] py-4 rounded-md grid grid-cols-6 items-center text-center gap-5 hover:cursor-pointer transition-all`}
      >
        {children}
      </div>
    </Link>
  )
}

const PlayerData = ({ Player }: {}): JSX.Element => {
  if(!id) {
    return (
      <div className={`bg-white m-6 shadow-xl py-4 rounded-md grid grid-cols-8 items-center text-center gap-5 transition-all`}>
        {children}
      </div>
    )
  }
  return (
    <Link href={`/players/${id}`} passHref>
      <div
        className={`bg-white m-6 shadow-xl hover:scale-[1.01] py-4 rounded-md grid grid-cols-6 items-center text-center gap-5 hover:cursor-pointer transition-all`}
      >
        {children}
      </div>
    </Link>
  )
}

export default Card
