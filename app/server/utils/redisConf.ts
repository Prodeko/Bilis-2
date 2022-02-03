import { createClient, SchemaFieldTypes } from "redis";

const client = createClient({ url: "redis://redis:6379" });

const setup = async () => {
	client.on("error", (err) => console.log("Redis Client Error", err));

	await client.connect();

	try {
		await client.ft.dropIndex("idx:nsearch");
		console.log("Index deleted");
	} catch (e: any) {
		if (e && e.message && e.message === "Unknown Index name") {
			console.log("Index doesn't exist yet");
		} else {
			// Something went wrong, perhaps RediSearch isn't installed...
			console.error(e);
			process.exit(1);
		}
	}

	try {
		// Documentation: https://oss.redis.com/redisearch/Commands/#ftcreate
		await client.sendCommand([
			"FT.CREATE",
			"idx:nsearch",
			"ON",
			"HASH",
			"PREFIX",
			"1",
			"nsearch:players",
			"SCHEMA",
			"firstName",
			"TEXT",
			"lastName",
			"TEXT",
			"nickname",
			"TEXT",
			"id",
			"NUMERIC",
			"updatedAt",
			"NUMERIC",
			"SORTABLE",
		]);
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
