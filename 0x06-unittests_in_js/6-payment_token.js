function getPaymentTokenFromAPI(success) {
  if (success === true) {
    return {data: 'Successful response from the API'};
  }
  return null
};

module.exports = getPaymentTokenFromAPI;
