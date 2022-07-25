const local_deving = {
  true: "http://localhost:5000/",
  false: "https://rocky-stream-04354.herokuapp.com/"
}

let deving = process.env.PORT ? false : true;
const enviorment = local_deving[deving];
async function update_max_pain_tags(page, symbol, Freqency) {
  // console.log("symbol----->",symbol)
  await page.goto(`https://swaggystocks.com/dashboard/options-max-pain/${symbol}`, {
    "waitUntil": "networkidle0"
  }).catch(e => console.error("error ", e));

const item = [
    ["default",".graph-metadata-item"], 
    ["chart",".chartjs-hidden-iframe"]
  ]

// Promise.all(item.map( async ({key,val})=>{
//   console.log('key-->', key, val);

//   await element[0].screenshot({
//     path: `public/${symbol}_max_pain_${key}.png`
//   }).catch(e => console.error("error ", e));
//   console.log("added __.", `${symbol}_${key}`);
//   Freqency.put(`${symbol}_${key}`, `${enviorment}${symbol}_max_pain_${key}.png`);

// }    ))
  for await (let [key, val] of item ){
    // console.log('key-->', key, val);
  let element = await page.$$(val).catch(e => {
    console.error(e)
  });

 
  await element[0].screenshot({
    path: `public/${symbol}_max_pain_${key}.png`
  }).catch(e => console.error("error ", e));
  // console.log("added __.", `${symbol}_${key}`);
  Freqency.set(`${symbol}_${key}`, `${enviorment}${symbol}_max_pain_${key}.png`);
  }
}


async function update_all_max_pain_tags(Freqency, page) {
let keys = [...Freqency.vals.keys()].map(symbol => symbol.split('_')[0]); 
await Promise.all(keys.map(symbol => update_max_pain_tags(page, symbol, Freqency)));
}

module.exports = {
  update_all_max_pain_tags
}