export const copyToClipboard = (text: string) => {
  return navigator.clipboard
    .writeText(text)
    .catch(() => console.log('error writing to clipboard'));
};
