export const stringIsNotValid = (
  stringLength: number,
  string: string | undefined
): boolean => {
  if (string === undefined) {
    return true;
  }
  if (string.trim().length > stringLength || string.trim().length === 0)
    return true;
  else return false;
};
