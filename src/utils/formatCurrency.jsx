export const formatCurrency = (val) => {
  let result = '0,00';
  if (val) {
    result = `${Number(val).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
    })}€`;
  }
  return result;
};
