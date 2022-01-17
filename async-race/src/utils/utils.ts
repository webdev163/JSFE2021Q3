export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomColor = () => {
  const r = (`0${  getRandomInt(50, 255).toString(16)}`).slice(-2);
  const g = (`0${  getRandomInt(50, 255).toString(16)}`).slice(-2);
  const b = (`0${  getRandomInt(50, 255).toString(16)}`).slice(-2);
  return `#${r}${g}${b}`;
}
