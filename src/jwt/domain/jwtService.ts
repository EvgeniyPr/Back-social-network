import jwt, { JwtPayload } from "jsonwebtoken";
import { SETTINGS } from "../../settings/settings";

export const jwtService = {
  createToken(email: string, login: string, userId: string) {
    return jwt.sign({ email, login, userId }, SETTINGS.SECRET_KEY!, {
      expiresIn: "500h",
    });
  },

  getUserInfoFromToken(token: string) {
    try {
      const payload = jwt.verify(token, SETTINGS.SECRET_KEY!) as JwtPayload;
      const { email, login, userId } = payload;
      return { email, login, userId };
    } catch (e) {
      return null;
    }
  },
};
