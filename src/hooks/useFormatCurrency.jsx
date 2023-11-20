export const useFormatCurrency = (val) => {
  const result = `€${Number(val).toLocaleString('es-ES', {
    minimumFractionDigits: 2,
  })}`;
  return result;
};
