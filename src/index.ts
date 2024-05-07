import { app } from "./app";
import { SETTINGS } from "./settings";
import { db } from "./db/db";

app.listen(SETTINGS.PORT, () => console.log("...server not  started"));
