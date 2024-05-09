export const isNotBooleanType = (value: any) => {
  if (value === undefined) {
    return;
  }
  if (typeof value !== "boolean" && value !== null) {
    return true;
  }
  return false;
};
