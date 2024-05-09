export const stringIsNotValid = (
  stringLength: number,
  string: string | undefined | null
): boolean => {
  if (string === undefined || string === null) {
    return true;
  }
  if (string.trim().length > stringLength || string.trim().length === 0)
    return true;
  else return false;
};
