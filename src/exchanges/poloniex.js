'use strict';

const _ = require('lodash');

module.exports = config => ({
  request: {
    method: 'get',
    url: `${config.url}/public`,
    params: {
      command: 'returnOrderBook',
      currencyPair: 'USDT_ETH',
      depth: 1
    }
  },
  parseResponse: res => {
    const bid = _.get(res, 'data.bids[0][0]');
    const ask = _.get(res, 'data.asks[0][0]');

    return { name: config.name, ticker: [bid, ask] };
  }
});
