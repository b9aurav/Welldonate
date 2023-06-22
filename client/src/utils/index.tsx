export const calculatePercentage = (goal: number, raisedAmount: number) => {
  const percentage: number = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const isImageExists = (url: string, callback: (arg0: boolean) => void) => {
  const img: HTMLImageElement = new Image();
  img.src = url;

  if (img.complete) callback(true);
  
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
