export const fileToBlob = (file: File): Blob => {
  return file instanceof Blob ? file : new Blob([file], { type: file.type });
};