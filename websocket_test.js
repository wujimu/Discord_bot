const axios = require('axios');
//https://old.nasdaq.com/screening/companies-by-name.aspx?letter=KGC&exchange=nasdaq&render=download
    axios.get('https://api.nasdaq.com/api/quote/KGC/info?assetclass=stocks')
      .then(response => {
        let stockList = response.data
        // .split('\r\n').map(stock => {
        // console.log(response.data)
        //     return stock.replace(/",/g, "").replace(/\"/g, "|").split("|").splice(1);
          
        // });

console.log(stockList)
        // stockList.pop();
        // stockList.shift();
        // let stocks = stockList.map(stock => {
        //   return {
        //     symbol: stock[0],
        //     name: stock[1],
        //     lastSale: stock[2],
        //     marketCap: stock[3],
        //     ipoYear: stock[4],
        //     sector: stock[5],
        //     industry: stock[6],
        //     summaryQuote: stock[7]
        //   }
        // })
        
        // console.log(stocks.find(x=>x.symbol === 'KGC'))
      })

