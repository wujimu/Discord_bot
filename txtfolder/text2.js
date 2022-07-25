let url_arr = ["https://www.cfr.org/", "https://genius.com/Laozi-tao-te-ching-stephen-mitchell-translation-annotated", "https://taoism.net/tao/wp-content/plugins/wonderplugin-pdf-embed/pdfjs/web/viewer.html?file=https%3A%2F%2Ftaoism.net%2Ftao%2Fwp-content%2Fuploads%2F2019%2F07%2FAccurate-Translation-of-the-Tao-Te-Ching.pdf", "https://www.bloomberg.com/", "https://www.wordhippo.com/what-is/the-opposite-of/conceal.html#/"];
const {
    write_file
} = require("C:/Users/dickcata/Desktop/bot/lib/write_to_file.js")


let words = {}
let url_redirected = false;

async function get_elements(page1, url, word, sentence, url_redirected) {

    words[word] = [];
    //await page1.waitForSelector('.relatedwords')


    



    await page1.goto(url, {
        "waitUntil": "networkidle0",
        "timeout": 0,
    }).catch(e => {
        console.error("error line 269: ", e)
    });


    // const watchDog = page.waitForFunction('window.status === "ready"');
    //     await watchDog;
    // await autoScroll(page);

    await page1.evaluate(() => {

        return Array.from(document.getElementById("contentpagecell").querySelectorAll('.wordtype, [href]')).map(x => x.innerText)

        // document.getElementsByClassName("textLayer")[0].innerText
        // return Array.from(document.getElementsByClassName("song_body-lyrics"))[0].innerText
        //   return  get_html_elements(document)
        //return Array.from(document.querySelectorAll("[href]")).map(x => x.href).filter(x => !x.includes('css'))

    }).then(response => {
        // response = response.split(/(\d+)/)
        response = response.filter(x => x !== '')

        words[word] = response.slice();
        // string = response.join(",");
        // console.log(response)
        // page1.goto(link)


    }).catch(console.error);

}


// function get_html_elements(document) {
//     Array.from(document.getElementsByClassName("textLayer"))[0].innerText
// }


let map = {};

(async () => {
    const page1 = await require("../lib/puppeteer_module.js").start();
 
    console.log(url_arr[1]);
    // await get_elements(page1, url_arr[3])
    let statement = "grapes sour";

    statement = statement.split("").map(x => x.toLowerCase()).filter(x => {
        if ((x.charCodeAt(0) >= 'a'.charCodeAt(0) && x.charCodeAt(0) <= 'z'.charCodeAt(0)) || x === " ") {
            if (x === ',') {
                console.log(x.charCodeAt())
            }
            return true;
        }
        return false;
    }).join("").split(" ");
    let sentence = statement.join(" ")



    statement = statement.filter(x => {
        if (map[x]) return false;
        map[x] = x
        return true;
    });
    sentence = {
        sentence: map
    }
    // console.log(map)
    // await page1.waitForNavigation()
    for(let x of statement){


        await get_elements(page1, `https://www.wordhippo.com/what-is/the-opposite-of/${x}.html#/`, x, sentence, url_redirected)

}


    write_file("antanyoms", function (file) {
 
        let keys = Object.keys(words);
        let values = Object.values(words)
        let m = keys.length;

        console.log('mmm--', values)
        while (m--) {
            file.write(`\n ${keys[m]}:`);
            let i = values[m].length;

            while (i--) {
                file.write(`${values[m][i]},`)

            }

            file.write(' \n');

        }
        file.close();
    })


    // console.log(words)
})().catch(console.error)

// const fs = require('fs');
// const path = require('path');

// let stop = fs.readFileSync(`stop_words_copy.txt`, 'utf8')
// let stop_words_filter = {}
// stop = stop.split(",");

// stop.forEach(x => stop_words_filter[x] = 1)




// function pad(n, width, z) {
//   z = z || '0';
//   n = n + '';
//   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
// }




// let companies = [];

// let t = "";

// let b;
// for (let i = 2; i < 222; i++) {
//   let c = pad(i, 8)

//   b = fs.readFileSync(`./txtfolder/${c}.txt`, 'utf8')

//   t = t.concat(b)


// };



// let replace = [".", "(", ")", "�", "^", "*", "\r", "\n", "'", "-", ",", ">"]
// t = t.split("").map(x => (replace.forEach(l => (x = x.replace(l, " "))), x)).join("")
// t = t.split("").filter(x => {
//   if (x != " ")
//     return isNaN(x)


//   return true;
// }).join("")

//  let m = t.split(" ").filter(x => x != " ").filter(x => x).map(x => x.toLowerCase()).filter(x => !stop_words_filter[x]);
// //let m = ["man", "man", "man", "is","yehoo", "worth", "a", "dam", "no", "no","mother","mother", "your", "mother", "not", "mad", "sizlak"]



// let obj4 = {};
// let obj = {}
// let k = m.length;
// while (k--) {
//   let word = m[k]
//   obj[word] = (obj[word] || 0) + 1;
// }

// let obj2 = {}
// k = m.length;
// while (k--) {

// let word = m[k]
// let id_count = obj[word]
// obj4[id_count]=word

//   if (id_count > 50) {




//     obj2[word] = (obj2[word] || []);

//   }
// }


// console.log(obj2)

// k = 0;
// while (k < m.length) {

// let word = m[k]
//   let count_id = obj[word];

//   if (obj2[word]) {


//    k=k+1;
// let frequencies ={};let f= 0;
//     while  (k< m.length && !obj2[ (m[k] ||{} )]) {


// frequencies[m[k]] =(frequencies [m[k]]||0 )+1;

// obj2[word]=[]
// k++;
// //.push(m[k++]);


//     }

//    obj2[word].push(JSON.stringify(Object.entries(JSON.parse(JSON.stringify(frequencies)) ) ) )
//   }else k++;


// }

//  let mappings = Object.entries(obj2)
//  mappings = mappings.map(x=> (x[0] = (obj[x[0]] + " " + x[0]), x) )

//  console.log(mappings)

// let obj = {
//     0: []
// };



// let num = 0;
// var PdfReader = require("pdfreader").PdfReader;
// let text = [];

// let obj2={}; let i = 0;
//  function done (f){
//    f=  f.slice(9)
// f = f.join("\n")

// while(i< f.length){


//     obj2[f[i]]=f[i+1]

// i++
// }
// console.log(obj2)
// }



// let ob = new PdfReader().parseFileItems("Tao-Te-Ching.pdf", function (err, item) {
//     if (item && item.text) {

// let words = item.text.slice()
// text.push(words)
//  console.log(num++);


//         // text.push( item.text.split("Chapter").map(x => x.trim()))c



//         // while (text.length) {
//             // let num_word = text.pop().filter(x => x).map(x => x.trim())
//             // num_word = num_word[0];
//             // if (!isNaN(+num_word)) {
//             //     num = +num_word;
//             //     obj[num] = []
//             // } else obj[num].push(JSON.stringify(num_word ))
//         // };

//     }
// if(num === 2711){
//  done(text);
// }

// })

//  console.log(text) 

// function read_file() {

//     const fs = require("fs");


//     b = fs.readFileSync(`./accurate.txt`, 'utf8')
//     b = b.split('\n')
//     b = b.filter(x => x != " ").filter(x => x != "")


//     console.log(b);
//     let dic = "";
//     let l = b.length
//     for (let i = 4; i < l; i += 4) {

//         dic = dic.concat(b[i - 1])


//     }
//     dic = dic.split(" ");

//     obj = {};
//     for (let i = 0; i < dic.length; i++) {
//         if (dic[i] == "TAO") {

//             obj[55]

//         }



//     }
// };