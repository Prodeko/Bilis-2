import { Op, Sequelize } from 'sequelize'

import { NewSeason } from '@common/types'
import { SeasonModel } from '@server/models'

const createSeason = async (season: NewSeason): Promise<SeasonModel> => {
  const createdSeason = await SeasonModel.create(season)
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

const deleteSeason = async (id: number): Promise<number> => {
  const deletedSeason = await SeasonModel.destroy({
    where: {
      id,
    },
  })

  return deletedSeason
}

const getSeasons = async (): Promise<SeasonModel[]> => {
  const seasons = await SeasonModel.findAll({})

  if (!seasons) throw new Error('No seasons found')

  return seasons.map(e => e.toJSON())
}

export { createSeason, getCurrentSeason, deleteSeason, getSeasons }
