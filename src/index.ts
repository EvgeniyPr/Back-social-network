import { app } from "./app";
import { SETTINGS } from "./videos/settings/settings";

app.listen(SETTINGS.PORT, () => console.log("...server started"));
