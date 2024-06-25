import { app } from "./app";
import { connectToDb } from "./db/mongo-db";
import { SETTINGS } from "./settings/settings";

const startApp = async () => {
  if (!SETTINGS.MONGO_URI) {
    console.log("MONGO_URI is not defined");
    process.exit(1);
  }

  if (!(await connectToDb(SETTINGS.MONGO_URI))) {
    console.log("no   connection to DB");
    process.exit();
  }
  app.listen(SETTINGS.PORT, () => console.log("...test server started"));
};

startApp();
