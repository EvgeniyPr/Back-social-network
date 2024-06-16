import { app } from "./app";
import { connectToDb } from "./db/mongo-db";
import { SETTINGS } from "./settings/SETTINGS";

const startApp = async () => {
  if (!(await connectToDb())) {
    console.log("no   connection to DB");
    process.exit();
  }
  app.listen(SETTINGS.PORT, () => console.log("...test server started"));
};

startApp();
