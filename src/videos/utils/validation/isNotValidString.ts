export const isNotValidString = (
  stringLength: number,
  string: string | undefined | null
): boolean => {
  if (string === undefined || string === null || typeof string === "number") {
    return true;
  }
  if (string.length > stringLength || string.trim().length === 0) return true;
  else return false;
};
