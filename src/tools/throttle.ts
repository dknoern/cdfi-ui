export const throttle = (
  func: Function,
  delay: number,
): ((...args: any[]) => void) => {
  let inProgress = false;

  return (...args: any[]): void => {
    if (inProgress) return;
    inProgress = true;

    setTimeout(() => {
      func(...args);
      inProgress = false;
    }, delay);
  };
};
