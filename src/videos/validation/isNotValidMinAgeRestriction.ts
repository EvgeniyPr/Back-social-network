export const isNotValidMinAgeRestriction = (
  value: number | undefined | null
) => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "number" && value >= 1 && value <= 18)
  ) {
    return false;
  }
  return true;
};
