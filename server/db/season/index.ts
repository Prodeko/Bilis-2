import { NewSeason, newSeason } from '@common/types'
import { SeasonModel } from '@server/models'

const createSeason = async (season: NewSeason): Promise<SeasonModel> => {
  const parsedSeason = newSeason.parse(season)
  const createdSeason = await SeasonModel.create(parsedSeason)
  return createdSeason
}

const getCurrentSeason = async (): Promise<SeasonModel | null> => {
  const currentSeason = await SeasonModel.findOne({
    where: {
      start: {
        gt: new Date(),
      },
      end: {
        lt: new Date(),
      },
    },
  })

  return currentSeason
}

export { createSeason, getCurrentSeason }
