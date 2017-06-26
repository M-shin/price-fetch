/**
 * app.js
 */

const axios = require('axios');
const { sprintf } = require('sprintf-js');

const config = require('../config');

const gdax = require('./exchanges/gdax')(config.exs.gdax);
const kraken = require('./exchanges/kraken')(config.exs.kraken);
const poloniex = require('./exchanges/poloniex')(config.exs.poloniex);

const write = data => {
  console.log(sprintf('%-15s %-20s %-10s', 'Exchange', 'Bid', 'Ask'));
  data.forEach(ex => {
    const { name, ticker } = ex;
    console.log(sprintf('%-15s %-20s %-10s', name, ticker[0], ticker[1]));
  });
  console.log(sprintf('Last updated: %s', new Date().toLocaleString()));
};

const collectPrices = next => {
  const exs = [gdax, kraken, poloniex];
  const requests = exs.map(ex => {
    const { parseResponse, request } = ex;

    return axios.request(request).then(parseResponse);
  });

  Promise.all(requests).then(res => {
    process.stdout.write('\x1Bc');
    write(res);

    setTimeout(next, config.interval, next);
  }).catch(err => {
    console.log(err);
  });
};

collectPrices(collectPrices);
