export const stringIsNotValid = (
  stringLength: number,
  string: string
): boolean => {
  if (string.trim().length > stringLength || string.trim().length === 0)
    return true;
  else return false;
};
