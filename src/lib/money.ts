const getDecimalCountFromCurrency = (currency?: string) => {
  if (!currency) return 0;

  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  });

  return formatter.formatToParts(0.11111).find((part) => part.type === 'fraction')?.value?.length ?? 0;
};

const validateNumberString = (str: string, decimalCount: number) => {
  const regexPattern = decimalCount > 0 ? `^\\d*(\\.\\d{0,${decimalCount}})?$` : /^(\d*)?$/;
  const regex = new RegExp(regexPattern);

  return regex.test(str);
};

const removeDecimalsByCount = (str: string, decimalCount: number) => {
  const [int, dec] = str.split('.');
  if (dec === undefined || decimalCount < 1) return int;

  return `${int}.${dec.slice(0, decimalCount)}`;
};

const formatAmountWithCurrency = (amount: number | string, currency?: string) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
};

const trimStringToFloat = (str: string) => {
  const numberVal = parseFloat(str);
  return isNaN(numberVal) ? '' : numberVal.toString();
};

export {
  getDecimalCountFromCurrency,
  validateNumberString,
  removeDecimalsByCount,
  formatAmountWithCurrency,
  trimStringToFloat,
};
