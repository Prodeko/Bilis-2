import {
	createSearchIndexForAll,
	getPlayerMetasByString,
} from "../../common/db/players";
import { redisConnection } from "./redisConf";

const fn = async () => {
	console.log(await createSearchIndexForAll());
};

fn().then(async () => {
	console.log(await getPlayerMetasByString("he"));
});
