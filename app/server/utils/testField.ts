import { createSearchIndexForAll } from "../../common/db/players";
import { redisConnection } from "./redisConf";

const fn = async () => {
  console.log(await createSearchIndexForAll());
};

fn().then(async () => {
  console.log(
    await redisConnection(async (client) =>
      Promise.all(
        ["Eli", "EI", "eino", "4", "ine"].map((sana) =>
          client.ft.search("idx:nsearch", sana)
        )
      )
    )
  );
});
