import { VALID_VIDEO_RESOLUTION } from "../settings/VALID_VIDEO_RESOLUTION";
export const isNotValidResolution = (inputResolutions: string[]): boolean => {
  return inputResolutions.some(
    (resolution: string) =>
      !Object.values(VALID_VIDEO_RESOLUTION).includes(
        resolution as VALID_VIDEO_RESOLUTION
      )
  );
};
