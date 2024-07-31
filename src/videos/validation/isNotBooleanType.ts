export const isNotBooleanType = (value: boolean | undefined) => {
  if (value === undefined) {
    return;
  }
  if (typeof value !== "boolean" && value !== null) {
    return true;
  }
  return false;
};
