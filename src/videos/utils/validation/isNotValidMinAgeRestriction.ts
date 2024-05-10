export const isNotValidMinAgeRestriction = (value: any) => {
  // if (value === undefined) {
  //   return false;
  // }
  if (
    value === null ||
    value === undefined ||
    (typeof value === "number" && value >= 1 && value <= 18)
  ) {
    return false;
  }
  return true;
};
