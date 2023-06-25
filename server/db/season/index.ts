import { Op, Sequelize } from 'sequelize'

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
      [Op.and]: [
        Sequelize.literal('"start" <= current_date'),
        Sequelize.literal('"end" >= current_date'),
      ],
    },
  })

  return currentSeason
}

const getSeasons = async (): Promise<SeasonModel[]> => {
  const seasons = await SeasonModel.findAll({})

  if (!seasons) throw new Error('No seasons found')

  return seasons.map(e => e.toJSON())
}

export { createSeason, getCurrentSeason, getSeasons }
