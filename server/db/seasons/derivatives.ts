import { SeasonModel } from '@server/models'

// NOTE!! Only use in dev, destroys everything in database
const clearSeasonsDEV = (): Promise<number> =>
  SeasonModel.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })

export { clearSeasonsDEV }
