// export const isNotValidResolution = (
//   inputResolution: string[],
//   VALID_VIDEO_RESOLUTION: any
// ) => {
//   return inputResolution.find((p) => {
//     !p.length ? true : !VALID_VIDEO_RESOLUTION[p];
//     if (!p.length) {
//       return true;
//     } else {
//       return !VALID_VIDEO_RESOLUTION[p];
//     }
//   });

// };
import { VALID_VIDEO_RESOLUTION } from "../settings/VALID_VIDEO_RESOLUTION";
export const isNotValidResolution = (inputResolutions: string[]): boolean => {
  return inputResolutions.some(
    (resolution: string) =>
      !Object.values(VALID_VIDEO_RESOLUTION).includes(
        resolution as VALID_VIDEO_RESOLUTION
      )
  );
};
