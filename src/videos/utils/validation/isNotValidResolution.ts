export const isNotValidResolution = (
  inputResolution: string[],
  Resolutions: any
) => {
  return inputResolution.find((p) => {
    console.log("call fn", p.length);
    if (!p.length) {
      return true;
    } else {
      return !Resolutions[p];
    }
  });
};
