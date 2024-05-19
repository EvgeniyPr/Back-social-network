import { app } from "./app";
import { SETTINGS } from "./settings/settings";

app.listen(SETTINGS.PORT, () => console.log("...test server started"));
