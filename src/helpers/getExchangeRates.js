const url = 'https://economia.awesomeapi.com.br/json/all';

const getExchangeRates = async () => {
  const response = await fetch(url);
  const exchangeRates = await response.json();
  return exchangeRates;
};

export default getExchangeRates;
