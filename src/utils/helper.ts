export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

export function getColorContrast(color: string): '#FFF' | '#000' {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  if(result) {
    const red = parseInt(result[1], 16);
    const green = parseInt(result[2], 16);
    const blue = parseInt(result[3], 16);

    if((red*0.299 + green*0.587 + blue*0.114) > 186) {
      return '#000'
    } else {
      return '#FFF'
    }
  }

  return '#FFF';
}

