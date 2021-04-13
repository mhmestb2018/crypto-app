const request = require('request')
const rootUrl = 'https://min-api.cryptocompare.com'
const token = process.env.CRYPTOCOMPARE_TOKEN;
const fetch = require('node-fetch');

// const coins = [
//     { name: 'Bitcoin', price: 100, ticker: 'BTC'},
//     { name: 'Ethereum', price: 50, ticker: 'ETH'},
//     { name: 'Ripple', price: 25, ticker: 'XRP'},
//     { name: 'Dogecoin', price: 50, ticker: 'DOGE'},
//     { name: 'IOTA', price: 0.5, ticker: 'IOT'},
//     { name: 'ZCASH', price: 25, ticker: 'ZCH'},
//     { name: 'BITCOIN CASH', price: 500, ticker: 'CASH'},
//     { name: 'LITECOIN', price: 250, ticker: 'LTC'},
//     { name: 'UNISWAP', price: 10, ticker: 'UNI'},
// ];

module.exports = {
    getAll,
    getOne, 
};

    /* 
    ================================
    A P I      I N F O R M A T I O N
    ================================

    response will display raw json
    coins will display all data after using .json()
    coins data consists of an object with diff properties in it.
    We want to use coins.Data, as that is where the data is stored.
    coins.Data(ARRAY) returns an array of objects consisting of;
    - CoinInfo(OBJ) which is basic coin info. Relevant fields includes:
        * ID (unique identifier) / Name(ticker) / FullName(name)
    - RAW(OBJ) consists of raw pricing data(OBJs). Noted that these are ints.
        * .USD.PRICE / .USD.CHANGE24HOUR(usd value) / .USD.CHANGEPCT24HOUR(%)
    - DISPLAY(OBJ) consists of pricing data(OBJs) in string form. May cause issues as some have $ in them.
        * .USD.PRICE / .USD.CHANGE24HOUR(usd value) / .USD.CHANGEPCT24HOUR(%)
    */

async function getAll() {
    let response = await fetch(`${rootUrl}/data/top/mktcapfull?limit=10&tsym=USD&api_key=${token}`);
    let coins = await response.json();


    const coinsData = [];
    coins.Data.forEach((element, idx) => {
        let coinInfo = element.CoinInfo;
        let raw = element.RAW;
        let display = element.DISPLAY;

        let coinObj = {
            "id" : coinInfo.Id,
            "ticker" : coinInfo.Name,
            "name" : coinInfo.FullName,
            "curPrice" : raw.USD.PRICE.toFixed(2),
            "price1PCT" : raw.USD.CHANGEPCTHOUR.toFixed(2),
            "price24PCT" : raw.USD.CHANGEPCT24HOUR.toFixed(2)
        }
        coinsData.push(coinObj);
    });

    return coinsData;
  }

async function getOne(name, fullname) {
    let response = await fetch(`${rootUrl}/data/pricemultifull?fsyms=${name}&tsyms=USD&api_key=${token}`);
    let coin = await response.json();
    let data = coin.RAW[`${name}`].USD;
        

    /* ====== H E L P E R ==========
        FROMSYMBOL: name
        LOW24HOUR: lowest price
        HIGH24HOUR: highest price
        CHANGE24HOUR: change price of 24hours
        CHANGEPCT24HOUR: change price % of 24hours
        CHANGEHOUR: change price hour
        CHANGEPCTHOUR: change price % hour
        SUPPLY:
        MKTCAP: market cap
        LASTUPDATE: last updated
        // passed in FULLNAME due to this weird API not showing full name in single targetted pings
    */

    // Inject full name from URL due to API foregoing username into this endpoint
    data.FULLNAME = fullname;
    console.log(data)
    return data;
}














