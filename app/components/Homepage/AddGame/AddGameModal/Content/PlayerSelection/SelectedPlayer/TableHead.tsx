import Image from 'next/image'

import type { PlayerWithStats } from '@common/types'
import PencilImage from '@public/images/edit-pencil.svg'
import { Side, setFocus, setPlayerId, useModalState } from '@state/Modal'

import styles from './SelectedPlayer.module.scss'

interface Props {
  player: PlayerWithStats
  side: Side
}

const TableHead = ({ player, side }: Props) => {
  const [_, dispatch] = useModalState()

  const onClear = async () => {
    await dispatch(setPlayerId(side, undefined))
    dispatch(setFocus(side))
  }
  return (
    <div className={styles.head}>
      <div>
        {player.firstName} {player.lastName}
      </div>
      <button onClick={onClear} type="button">
        <Image src={PencilImage} width={24} alt="edit pencil" />
      </button>
    </div>
  )
}

export default TableHead
