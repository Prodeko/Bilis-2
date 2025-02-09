#!/usr/bin/env node
import dbConf from "./dbConf";

if (require.main === module) {
  dbConf.umzug.runAsCLI();
}
