const getDestinationName = (city: string, country?: string) => (country !== undefined ? `${city}, ${country}` : city);

export { getDestinationName };
