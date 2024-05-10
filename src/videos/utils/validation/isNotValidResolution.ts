export const isNotValidResolution = (
  inputResolution: string[],
  Resolutions: any
) => {
  return inputResolution.find((p) => {
    if (!p.length) {
      return true;
    } else {
      return !Resolutions[p];
    }
  });
};
