import { Op, Sequelize } from 'sequelize'

import { NewSeason } from '@common/types'
import { SeasonModel } from '@server/models'

const createSeason = async (season: NewSeason): Promise<SeasonModel> => {
  const overlappingSeason = await SeasonModel.findOne({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            Sequelize.literal(`"start" <= '${season.start.toISOString()}'`),
            Sequelize.literal(`"end" >= '${season.start.toISOString()}'`),
          ],
        },
        {
          [Op.and]: [
            Sequelize.literal(`"start" <= '${season.end.toISOString()}'`),
            Sequelize.literal(`"end" >= '${season.end.toISOString()}'`),
          ],
        },
      ],
    },
  })
  if (overlappingSeason) throw new Error('Season overlaps with existing season')
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

const updateSeason = async (id: number, data: NewSeason): Promise<number> => {
  const updatedCount = await SeasonModel.update(data, {
    where: {
      id,
    },
  })

  return updatedCount[0]
}

const getSeasons = async (): Promise<SeasonModel[]> => {
  const seasons = await SeasonModel.findAll({
    order: [['start', 'ASC']],
  })

  if (!seasons) throw new Error('No seasons found')

  return seasons.map(e => e.toJSON())
}

export { createSeason, getCurrentSeason, deleteSeason, updateSeason, getSeasons }
