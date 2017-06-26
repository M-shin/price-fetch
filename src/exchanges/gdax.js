'use strict';

const _ = require('lodash');

module.exports = config => ({
  request: {
    method: 'get',
    url: `${config.url}/products/ETH-USD/book`
  },
  parseResponse: res => {
    const bid = _.get(res, 'data.bids[0][0]');
    const ask = _.get(res, 'data.asks[0][0]');

    return { name: config.name, ticker: [bid, ask] };
  }
});
