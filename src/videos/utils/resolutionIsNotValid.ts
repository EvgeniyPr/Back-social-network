export const resolutionIsNotValid = (
  inputResolution: string[],
  Resolutions: any
) => {
  return inputResolution.find((p) => p.length && !Resolutions[p]);
};
