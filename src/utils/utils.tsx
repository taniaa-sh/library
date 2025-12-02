export const base64ToBlob = (base64: string, contentType: string = 'application/pdf'): Blob => {
  const cleanedBase64 = base64.replace(/\s/g, '');
  const byteCharacters = atob(cleanedBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};
