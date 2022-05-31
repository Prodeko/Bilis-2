import Link from 'next/link'
import { Player, PlayerMeta } from '../../common/types'

type Props = {
  id?: PlayerMeta['id']
  children: JSX.Element[]
  cols?: string | number
}

const Card = ({ id, children, cols }: Props): JSX.Element => {
  const colStructure = cols ? `grid-cols-${cols}` : `grid-cols-4`
  const styles = `grid ${colStructure} z-10 bg-white shadow-xl hover:scale-[1.01] py-3 px-6 rounded-md items-center gap-2 hover:cursor-pointer transition-all`
  if (id !== undefined) {
    return (
      <Link href={`/players/${id}`} passHref>
        <div className={styles}>{children}</div>
      </Link>
    )
  } else {
    return <div className={styles}>{children}</div>
  }
}

// const PlayerData = ({ Player }: {}): JSX.Element => {
//   if(!id) {
//     return (
//       <div className={`bg-white m-6 shadow-xl py-4 rounded-md grid grid-cols-8 items-center text-center gap-5 transition-all`}>
//         {children}
//       </div>
//     )
//   }
//   return (
//     <Link href={`/players/${id}`} passHref>
//       <div
//         className={`bg-white m-6 shadow-xl hover:scale-[1.01] py-4 rounded-md grid grid-cols-6 items-center text-center gap-5 hover:cursor-pointer transition-all`}
//       >
//         {children}
//       </div>
//     </Link>
//   )
// }

export default Card
