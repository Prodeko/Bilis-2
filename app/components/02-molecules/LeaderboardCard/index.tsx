import Paragraph from '@atoms/Paragraph'
import { getCssClass } from '@common/utils/helperFunctions'
import styles from './LeaderboardCard.module.scss'

interface Props {
  position: number
  emoji: any
  name: string
  points: number
}

const LeaderboardCard = (props: Props): JSX.Element => {
  return (
    <div className={getCssClass(styles)}>
      <Paragraph variation="m">{props.position}.</Paragraph>
      <Paragraph variation="m">{props.emoji}</Paragraph>
      <Paragraph variation="m">{props.name}</Paragraph>
      <Paragraph variation="m">Pisteet: {props.points}</Paragraph>
    </div>
  )
}

export default LeaderboardCard
