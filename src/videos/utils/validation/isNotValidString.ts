export const isNotValidString = (
  stringLength: number | null = null,
  string: string | undefined | null
): boolean => {
  if (string === undefined || string === null) {
    return true;
  }
  if (
    (stringLength !== null && string.trim().length > stringLength) ||
    string.trim().length === 0
  ) {
    return true;
  }
  return false;
};
