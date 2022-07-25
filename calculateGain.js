var http = require('http');
var express = require('express');
var app = express();
var MarkovChain = require('markovchain')


var Markov = new MarkovChain();
 

var server = http.createServer(app);
// Pass a http.Server instance to the listen method
var io = require('socket.io').listen(server);

// The server should start listening
server.listen(80);
const path = require('path');



const fetch = require("node-fetch");
const axios = require('axios');
const WebSocket = require('ws')
const {MovingAverage} = require('./lib/algos/moving_average');
const {
    write_file
} = require('./lib/write_to_file.js')
const fs = require('fs');
//https://old.nasdaq.com/screening/companies-by-name.aspx?letter=KGC&exchange=nasdaq&render=download


// axios(`https://api.nasdaq.com/api/quote/KGC/info?assetclass=stocks`).then(x=>{
// console.log(x)


//   }).catch(e=> console.error('error',e)); 
// var ws = new WebSocket("ws://34.214.40.112/stream?symbol=NDAQ,AAPL,GOOG,MSFT&start=20200910&end=20200910");

// process.stdin.resume();
//     process.stdin.setEncoding('utf8');

//     process.stdin.on('data', function(message) {
//       message = message.trim();
//       ws.send(message, console.log.bind(null, 'Sent : ', message));
//     });

//     ws.on('message', function(message) {
//       console.log('Received: ' + message);
//     });

//     ws.on('close', function(code) {
//       console.log('Disconnected: ' + code);
//     });

//     ws.on('error', function(error) {
//       console.log('Error: ' + error.code);
//     });



async function get_ticker(symbols) {

    let Alldata = await Promise.all(symbols.map(({
        symbol,
        class_type
    }) => axios(`https://api.nasdaq.com/api/quote/${symbol}/info?assetclass=${class_type}`))).catch(e => {
        console.error("error: ", e)
    })
    let dataMap = await Promise.all(Alldata.map(data => data.data)).catch(e => {
        console.error("error: ", e)
    });
    return dataMap;
};


//let data = get_ticker_data(["KGC"]);






// let price = 8.45;
// let share = 1210;

// symbol lookup https://tvc4.forexpros.com/f7413246d3582495afb42de5bf0a3ed4/1535796000/1/1/8/symbols?symbol=GDX
// response {"name":"GDX","exchange-traded":"NYSE","exchange-listed":"NYSE ","timezone":"America\/New_York","minmov":1,"minmov2":0,"pricescale":100,"pointvalue":1,"has_intraday":true,"has_no_volume":false,"volume_precision":3,"ticker":"40681","description":"VanEck Vectors Gold Miners ETF, United States","type":"ETF","has_daily":true,"has_weekly_and_monthly":true,"supported_resolutions":["1","5","15","30","60","300","D","W","M","45","120","240"],"intraday_multipliers":["1","5","15","30","60","300"],"session":"2;0930-1600:23456","data_status":"streaming"}

// let dollar = price*share


// let avrage = [{q:2210, p:7.84}, {q:125, p:8.18},{q:3635,p:8.48},{}]





function price_for_shares(price, shares) {
    return Math.floor(shares / price);
}

function buy_shares(price, shares) {

    return Math.floor(shares / price)


}

function sell(buy_price,shares, amount,sell ){
          let b = buy_price * shares;
            let sel =  sell * amount;

}



sell(10.10,198,2000,10.30 )


function buyBack(sharePrice, shares) {
    let number_of_shares = shares.dollar_value / sharePrice;
  
    let orginal_num_of_shares = shares.orginal_num_of_shares;


    let difference = number_of_shares - orginal_num_of_shares;
    return {
        number_of_shares_to_buy: number_of_shares,
        at_this_price_point: sharePrice,
        difference_gained: difference
    }
}

function sold(price, share) {
    return {
        dollar_value: Math.floor(price * share),
        shares: share / price,
        orginal_num_of_shares: share
    };
}

function sell_and_buy_back(trade,  current_price, symbol) {
const [price,dollar_amount, number_of_shares_sold] =trade;
    let current_dollar_amount_for_shares_sold =  number_of_shares_sold * current_price;
    let  new_shares_number =  dollar_amount /  current_price;
    let difference_in_share_amount = new_shares_number - number_of_shares_sold;


    return {
        "company": symbol,
        "price_sold": price,
        "shares_sold":number_of_shares_sold,
        "buy_back_price": current_price,
        "shares_to_buy": new_shares_number,
        "difference_in_shares": difference_in_share_amount,
        "dollar_gain":dollar_amount - current_dollar_amount_for_shares_sold  
    }
}


let total_cash = 0


// price // share // dollar amount
let price_point_shares_bought = {
    JD_STOCKS:[
        [76.11, 4033.83, 53]
    ],

    KGC_STOCKS: [
        [8.43, 85299.26, 10111]
    ]
}

let price_point_shares_sold = {
    KGC_STOCKS: [
        // [8.81,4995.27, 567], 
        // [8.90,4992.90, 561],
        [9.10,4995.90, 549],
        [9.58,2000, 209]
    ]
};
//242 8.40   2000k
// 240 8.33  2000k
// 238 8.40  2000k

let price_avg={};
let all_stocks= {};
Object.assign(all_stocks, price_point_shares_sold);
Object.assign(all_stocks,price_point_shares_bought);







function find_maximum(trades, current_price, symbol) {

    let len = trades.length;
    let iter = 0;
    let max = 0;
    let last_max = 0;
    let last_max_object;


    while (len--) {
      
 const sell_object = sell_and_buy_back(trades[iter], current_price, symbol);
const {company,price_sold, shares_sold,  buy_back_price, shares_to_buy, difference_in_shares,
difference_in_price } = sell_object;

        max = Math.max(max, difference_in_shares);
        if (max > last_max) {
            last_max = max;
            last_max_object = sell_object;
        }
        iter++;
    }

    if (max > 0) return last_max_object
    else return symbol + " no good buy back";


}

function potential_candidates(sharesbought, lastSalePrice, symbol) {
for (let sharebought of sharesbought) {
const [price_per_share, dollar_value, shares] = sharebought;
       let temp_dollar_value =  shares * lastSalePrice



    

        }

}












  (async () => {
    


    let interval = ( (420 * 60 *60) / 10 );
    console.log("interval",interval)
    for(let key of Object.keys(all_stocks) ){

        price_avg[key] = new MovingAverage(interval);
        
        }
        

   let History = " ";


    setInterval(async () => {

        let bought = Object.keys(price_point_shares_bought);
        let sold = Object.keys(price_point_shares_sold);
        let symbols = [...bought, ...sold].map(symbols => {

            let symbol_query_peramiters = symbols.split("_");
            return {
                symbol: symbol_query_peramiters[0],
                class_type: symbol_query_peramiters[1]
            };
        });



        let companies = await get_ticker(symbols).catch(x => { console.error(x) });

     

        companies.forEach(company => {

          let num =    company.data.primaryData.lastSalePrice.slice(1).split('.').join("");
          if(company.data.symbol === "KGC"){
        History += num.toString() +" ";
            console.log('num', num)
            console.log('History', History)
            console.log("Markov : ", Markov.parse(History).end(1).process())
        }
            const current_price = parseFloat(company.data.primaryData.lastSalePrice.slice(1));
                
            let symbol_key = company.data.symbol + "_" + company.data.assetClass;

            const shares_sold = price_point_shares_sold[symbol_key];
            const shares_bought = price_point_shares_bought[symbol_key]

           

         io.emit('news', { price: current_price,avg: price_avg[symbol_key].next(current_price)} );




            if (shares_sold) {

          




            

                let maximum = find_maximum(shares_sold,current_price , company.data.symbol); 
            
         
                 console.log("price: ",company.data.primaryData.lastSalePrice)

                console.log(maximum,   `\n Date:  ` + new Date().toLocaleString() + " at current price of : " + company.data.primaryData.lastSalePrice);


            }
  
            if (shares_bought) {
                potential_candidates(shares_bought, parseFloat(company.data.primaryData.lastSalePrice.slice(1)), company.data.symbol)



            }



            





            fs.appendFile(`./priceLogs/${company.data.symbol}.txt`, `${company.data.primaryData.lastSalePrice.slice(1)}-${new Date().toLocaleString()} \n`, function (err) {
                if (err) throw err;
                // console.log('Saved!');
            });
        });

    }, 10000);




  // });


  app.use('/static', express.static('node_modules'))
    .set('views', path.join(__dirname, 'views'))
 
    .get('/', (req, res) => res.send(`<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Socket.io</title>
        </head>
        <body>
            <h1>Express and socket.io</h1>
            <div id="news-list"></div>
            <script src="static/socket.io-client/dist/socket.io.js"></script> 
            <script src="https://d3js.org/d3-dispatch.v2.min.js"></script>
            <script src="https://d3js.org/d3-quadtree.v2.min.js"></script>
            <script src="https://d3js.org/d3-timer.v2.min.js"></script>
            <script src="https://d3js.org/d3-force.v2.min.js"></script>
            <script>
           
            document.addEventListener("DOMContentLoaded", function() {
                const $ = (selector, context = document) => context.querySelector(selector);
                const $$ = (selector, context = document) =>
                  context.querySelectorAll(selector);
                const html = (nodeList, newHtml) => {
                  Array.from(nodeList).forEach(element => {
                    element.innerHTML = newHtml;
                  });
                };
                const listen = node => event => method =>
                  node.addEventListener(event, method);
                const makeNode = node => document.createElement(node);
                const stringIt = obj => JSON.stringify(obj);
                const getLocation = () => {
                  navigator.geolocation
                    ? navigator.geolocation.getCurrentPosition(showPosition)
                    : (display.innerHTML = "Geolocation is not supported by this browser.");
                };
                const tableCreate = items => {
                  let format = Object.entries(items);
                  items = format.filter(x => x[1]);
                  let tbl = document.createElement("table");
                  tbl.style.width = "200px";
                  tbl.style.border = "1px solid black";
              
                  let tr = tbl.insertRow();
                  let trl = tr.insertCell(0);
                  let trrl = tr.insertCell(1);
                  let lable1 = trl.appendChild(document.createTextNode("category"));
                  let lable2 = trrl.appendChild(document.createTextNode("data"));
                  for (let i of items) {
                    let col1 = trl.appendChild(tbl.insertRow());
                    let col2 = trrl.appendChild(tbl.insertRow());
                    col1.appendChild(document.createTextNode(i[0]));
                    col2.appendChild(
                      document.createTextNode(typeof i[1] === "object" ? i[1].pretty : i[1])
                    );
                    col2.style.width = "100px";
                    col1.style.border = "1px solid black";
                    col2.style.border = "1px solid black";
                  }
                  tbl.style.width = "400px";
                  document.body.insertAdjacentElement("beforeend", tbl);
                };
                const getLength = number => number.toString().length;
                let frag = document.createDocumentFragment();
                let button = makeNode("button");
                let consent = makeNode("p");
                let display = makeNode("div");
                let dateInput = makeNode("input");
                let show = makeNode("button");
                let submit = makeNode("button");
                show.innerText = "select your own date";
                submit.innerText = "submit";
                submit.style.display = "none";
                dateInput.style.display = "none";
                dateInput.setAttribute("type", "date");
                dateInput.setAttribute("id", "date");
                dateInput.style.margin = "15px";
              
                button.innerText = "click to get last Sunday's forcast";
                consent.innerText =
                  "Your consent is required to obtain forcast information. Please click and allow the location of your browser to be idenfityied.";
                frag.appendChild(consent);
                frag.appendChild(button);
                frag.appendChild(display);
                frag.appendChild(show);
                frag.appendChild(dateInput);
                frag.appendChild(submit);
                const grabDateInput = input => {};
                const toggle = element => {
                  dateInput.style.display === "none"
                    ? (
                        (button.style.display = "none"),
                        (dateInput.style.display = "inline"),
                        (submit.style.display = "inline")
                      )
                    : (
                        (button.style.display = "inline"),
                        (dateInput.style.display = "none"),
                        (dateInput.value = null),
                        (submit.style.display = "none")
                      );
                };
              
                document.body.appendChild(frag);



                listen(button)("click")(getLocation);
                listen(show)("click")(toggle);
                listen(submit)("click")(getLocation);
                function getLastSunday(d) {
                  var t = new Date(d);
                  t.setDate(t.getDate() - t.getDay());
                  return t;
                }
                let sunday = getLastSunday(new Date());
                let month = 0;
                let day = 0;
                getLength(sunday.getMonth()) < 2
                  ? (month = "" + 0 + (sunday.getMonth() + 1))
                  : (month = sunday.getMonth() + 1);
                getLength(sunday.getDate()) < 2
                  ? (day = "" + 0 + sunday.getDate())
                  : (day = sunday.getDate());
              
                function showPosition(position) {
                  let formatedDate;
                  let week = true;
                  dateInput.value
                    ? ((formatedDate = dateInput.value.replace(/-/g, "")), (week = false))
                    : (formatedDate = "" + sunday.getFullYear() + month + day);
              
                  let payload = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    lastWeek: formatedDate,
                    type: week
                  };
                  let data = new FormData();
                  data.append("json", JSON.stringify(payload));
                  fetch("/weather", { method: "post", body: data })
                    .then(res => res.json())
                    .then(res => {
                      week
                        ? res.forEach(item => {
                            tableCreate(item.history.dailysummary[0]);
                          })
                        : tableCreate(res.history.dailysummary[0]);
                    });
                }


              });
              var nodes = [
                {"id": "Alice"},
                {"id": "Bob"},
                {"id": "Carol"}
              ];
              
              var links = [
                {"source": 0, "target": 1}, // Alice → Bob
                {"source": 1, "target": 2} // Bob → Carol
              ];
              var simulation = d3.forceSimulation(nodes)
              .force("charge", d3.forceManyBody())
              .force("link", d3.forceLink(links))
              .force("center", d3.forceCenter());
            
            var socket = io('http://localhost:80');
                socket.on('news', function (data) {
                    var div = document.getElementById("news-list");
                    console.log("Rendering news : ",data);
    
                    for(var i = 0;i < data.length;i++){
                        var newsItem = data[i];
                        div.innerHTML += "<h3>" + newsItem.title + ' <small>'+ newsItem.date + "</small></h3><br>";
                    }
    
                    socket.emit('my other event', { my: 'data' });
                });
            </script>
            <script src="https://d3js.org/d3.v6.min.js"></script>
        </body>
    </html>`))
    .listen(8080, () => {
   // will start once server starts
      console.error(`Listening on ${ 8080 }`)
    })



})()


