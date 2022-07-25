






// function sell(buy_price,shares, amount,sell ){
//     let b = amount/buy_price;
//       let s =  amount/sell;
//         return r;
// }



// let r = sell(10.10,198,2000,10.80)
 


// function amount(price, shares){



// return price*shares;

// } 



// let m = amount(10.95,183)




function minWindow(string, match) {
  let left = 0;
  let right = -1;
  let minStr = '';
  let map = {};

  match.split(" ").forEach(chr => map[chr] = (map[chr] || 0) + 1);
map
  let count = Object.keys(map).length;

  console.log(count)
  while (right < string.length) {
      if (count === 0) {
          if (!minStr || right - left + 1 < minStr.length) minStr = string.slice(left, right + 1);
          if (map[string[left]] !== undefined) map[string[left]]++;
          if (map[string[left]] > 0) count++;
          left++;
      } else {
          right++;
          if (map[string[right]] !== undefined) map[string[right]]--;
          if (map[string[right]] === 0) count--;
          right
      }
  }
  return minStr;
}
let str = "hello world max pain aapl".split(" ");
let r= minWindow(str, "aapl pain max" )

r