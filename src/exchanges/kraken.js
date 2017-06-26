'use strict';

const _ = require('lodash');

module.exports = config => ({
  request: {
    method: 'get',
    url: `${config.url}/0/public/Depth`,
    params: {
      pair: 'ETHUSD',
      count: 1
    }
  },
  parseResponse: res => {
    const bid = _.get(res, 'data.result.XETHZUSD.bids[0][0]');
    const ask = _.get(res, 'data.result.XETHZUSD.asks[0][0]');

    return { name: config.name, ticker: [bid, ask] };
  }
});
