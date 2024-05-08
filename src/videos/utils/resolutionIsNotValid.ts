export const resolutionIsNotValid = (
  inputResolution: string[],
  Resolutions: any
) => inputResolution.find((p) => p !== Resolutions[p]);
