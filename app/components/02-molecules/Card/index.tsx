import Paragraph from '@atoms/Paragraph'
import { getCssClass } from '@common/utils/helperFunctions'
import type { CardVariation } from '@common/types/variations'
import baseStyles from './Card.module.scss'
import infoStyles from './CardInfo.module.scss'
import statsStyles from './CardStats.module.scss'

interface BaseProps {
  variation: CardVariation
  position: number
  emoji: any
  name: string
  points: number
}

interface LeaderboardProps extends BaseProps {
  variation: 'leaderboard'
}

const LeaderboardCard = (props: LeaderboardProps): JSX.Element => {
  const { variation, position, emoji, name, points } = props
  return (
    <div className={getCssClass(baseStyles, variation)}>
      <div className={getCssClass(infoStyles, variation)}>
        <Paragraph variation="m">{position}.</Paragraph>
        <Paragraph variation="m">{emoji}</Paragraph>
        <Paragraph variation="m">{name}</Paragraph>
      </div>
      <div className={getCssClass(statsStyles, variation)}>
        <Paragraph variation="m">{points}</Paragraph>
      </div>
    </div>
  )
}

export default LeaderboardCard
