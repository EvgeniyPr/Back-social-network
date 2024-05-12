export const isNotValidResolution = (
  inputResolution: string[],
  Resolutions: any
) => {
  return inputResolution.find((p) => {
    console.log(p.length);
    !p.length ? true : !Resolutions[p];
    if (!p.length) {
      return true;
    } else {
      return !Resolutions[p];
    }
  });
};
