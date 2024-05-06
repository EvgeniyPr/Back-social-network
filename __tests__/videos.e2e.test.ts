import { req } from "./test-helpers";
import { SETTINGS } from "../src/settings";
describe("/videos", () => {
  beforeAll(async () => {
    // await req.delete("/testing/all-data");
  });
  test("should get empty array", async () => {
    const res = await req.get(SETTINGS.PASS.VIDEO).expect(200);
    console.log(res.body);
  });
  test("should get not empty array", async () => {
    const res = await req.get(SETTINGS.PASS.VIDEO).expect(200);
    console.log(res.body);
  });
});
