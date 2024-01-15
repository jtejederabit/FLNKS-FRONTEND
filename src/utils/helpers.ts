export const getScale = (value: number) => {
  let scale: string = '';
  if (value >= 1e9) {
    scale = 'billion';
  } else if (value >= 1e6) {
    scale = 'million';
  } else if (value >= 1e3) {
    scale = 'thousand';
  } else {
    scale = '';
  }
  return scale;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(value);
};
