const coins = [
    { name: 'Bitcoin', price: 100, ticker: 'BTC'},
    { name: 'Ethereum', price: 50, ticker: 'ETH'},
    { name: 'Ripple', price: 25, ticker: 'XRP'},
    { name: 'Dogecoin', price: 50, ticker: 'DOGE'},
    { name: 'IOTA', price: 0.5, ticker: 'IOT'},
    { name: 'ZCASH', price: 25, ticker: 'ZCH'},
    { name: 'BITCOIN CASH', price: 500, ticker: 'CASH'},
    { name: 'LITECOIN', price: 250, ticker: 'LTC'},
    { name: 'UNISWAP', price: 10, ticker: 'UNI'},
];

module.exports = {
    getAll,
};

function getAll() {
    console.log(coins);
    return coins;
}

function getOne() {
    console.log(coin);
    return coin;
}














