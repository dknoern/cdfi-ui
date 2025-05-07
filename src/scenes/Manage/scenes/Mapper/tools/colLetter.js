const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const colLetter = (index) => {
  const letterCnt = alphabet.length;

  if (index < letterCnt) return alphabet[index];

  const overFlow = Math.floor((index + 1) / letterCnt);
  const ost = (index + 1) % letterCnt;
  return `${alphabet[overFlow - 1]}${alphabet[ost - 1]}`;
};
