import { josa } from 'es-hangul';

const getDestinationName = (city: string, country?: string) =>
  country !== undefined && country.length > 0 ? `${city}, ${country}` : city;

const roUroJosa = (word: string) => {
  const resJosa = josa(word, '으로/로').replace(word, '');
  return resJosa === '으로' ? true : false;
};

export { getDestinationName, roUroJosa };
