const { connectToDbs } = require('./config/db.js')
const oldModels = require('./models/old/index.js')
const newModels = require('./models/new/index.js')

const main = async () => {
  await connectToDbs()
  const oldPlayas = await oldModels.Player.findAll({})
  const creates = oldPlayas.map(p => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    elo: p.fargo,
  }))

  await newModels.Player.bulkCreate(creates)
}

main()
