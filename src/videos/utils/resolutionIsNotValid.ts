export const resolutionIsNotValid = (
  inputResolution?: string[],
  Resolutions?: any
) => {
  if (inputResolution === undefined) {
    return true;
  } else {
    return inputResolution.find((p) => !Resolutions[p]);
  }
};
