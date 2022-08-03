import type { NextApiRequest, NextApiResponse } from 'next'
import type { HomeLeaderboard } from '@common/types'

export default function handler(req: NextApiRequest, res: NextApiResponse<HomeLeaderboard>) {
  const leaderboardMock = [
    { position: 1, points: 100, emoji: '🫥', name: 'Aleks' },
    { position: 2, points: 53, emoji: '🥵', name: 'Sakari' },
    { position: 3, points: 23, emoji: '😫', name: 'Leevi' },
  ]
  res.status(200).json(leaderboardMock)
}
