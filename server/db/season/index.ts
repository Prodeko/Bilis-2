import { NewSeason, newSeason } from '@common/types'
import { SeasonModel } from '@server/models'

const createSeason = async (season: NewSeason): Promise<SeasonModel> => {
  const parsedSeason = newSeason.parse(season)
  const createdSeason = await SeasonModel.create(parsedSeason)
  return createdSeason
}

export { createSeason }
