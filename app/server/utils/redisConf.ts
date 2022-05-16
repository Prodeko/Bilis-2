import { createClient } from 'redis'
import { checkSetupScript } from './setupScriptHandler'
import redisKeys from '../../common/utils/redisKeys'

declare global {
  var redisClient: ReturnType<typeof createClient> | null | undefined
}

const getClient = () => {
  if (!global.redisClient) {
    global.redisClient = createClient({ url: 'redis://redis:6379' })
  }
  return global.redisClient
}

const setup = async () => {
  await getClient().connect()
  await getClient().ft.configSet('MINPREFIX', '1')
  await getClient().ft.configSet('MAXEXPANSIONS', '1000')

  try {
    await getClient().ft.dropIndex('idx:nsearch')
    console.log('Index deleted')
  } catch (e: any) {
    if (e && e.message && e.message === 'Unknown Index name') {
      console.log("Index doesn't exist yet")
    } else {
      // Something went wrong, perhaps RediSearch isn't installed...
      console.error(e)
      process.exit(1)
    }
  }

  try {
    // Documentation: https://oss.redis.com/redisearch/Commands/#ftcreate
    await getClient().sendCommand([
      'FT.CREATE',
      'idx:nsearch',
      'ON',
      'HASH',
      'PREFIX',
      '1',
      redisKeys.playerSearch,
      'SCHEMA',
      'firstName',
      'TEXT',
      'lastName',
      'TEXT',
      'nickname',
      'TEXT',
      'id',
      'TEXT',
      'updatedAt',
      'NUMERIC',
      'SORTABLE',
    ])
  } catch (e: any) {
    if (e && e.message && e.message === 'Index already exists') {
      console.log('Index exists already, skipped creation.')
    } else {
      // Something went wrong, perhaps RediSearch isn't installed...
      console.error(e)
      process.exit(1)
    }
  }
}

checkSetupScript('redis-setup-0.1', setup)

export async function redisConnection<T>(
  fn: (cl: ReturnType<typeof createClient>) => Promise<T>
): Promise<T> {
  return fn(getClient())
}
