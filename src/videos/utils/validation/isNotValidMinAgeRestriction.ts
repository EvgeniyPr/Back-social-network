export const isNotValidMinAgeRestriction = (value: any) => {
  if (value === undefined) {
    return;
  }
  if (
    value === null ||
    (typeof value === "number" && value >= 1 && value <= 18)
  ) {
    return false;
  }
  return true;
};
