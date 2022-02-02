import { createClient, SchemaFieldTypes } from "redis";

const client = createClient({ url: "redis://redis:6379" });

const setup = async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  try {
    // Documentation: https://oss.redis.com/redisearch/Commands/#ftcreate
    await client.ft.create(
      "idx:nsearch",
      {
        firstName: SchemaFieldTypes.TEXT,
        lastName: SchemaFieldTypes.TEXT,
        nickName: SchemaFieldTypes.TEXT,
        id: SchemaFieldTypes.NUMERIC,
      },
      {
        ON: "HASH",
        PREFIX: "noderedis:players",
      }
    );
  } catch (e: any) {
    if (e && e.message && e.message === "Index already exists") {
      console.log("Index exists already, skipped creation.");
    } else {
      // Something went wrong, perhaps RediSearch isn't installed...
      console.error(e);
      process.exit(1);
    }
  }
};

setup();

export async function redisConnection<T>(
  fn: (cl: typeof client) => Promise<T>
): Promise<T> {
  return await fn(client);
}

export default client;
