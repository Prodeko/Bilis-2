import Link from "next/link"
import { Player, PlayerMeta } from "../../../common/types"

type Props = {
  id?: PlayerMeta['id']
  children: JSX.Element[]
}

const Card = ({ id, children }: Props): JSX.Element => {
  return (
    <Link href={`/players/${id}`} passHref>
      <div
        className={`bg-white m-6 shadow-xl hover:scale-[1.01] py-4 rounded-md grid grid-cols-${children.length} items-center text-center gap-5 hover:cursor-pointer transition-all`}
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
