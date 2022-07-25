var fs = require('fs');

var file = fs.createWriteStream('force_graph.csv');
// // function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

// function action() {

//     let subject = ["Gold","Bright-Barley", "Metal-Sunshine", "Bright-Yellow", "The Untarnished Dollar", "Gold", "Barley-Bright" ];
//     let verb = ["is on cloud nine", "is in high spirits", "is makeing a killing", "is laying it on thick", "is sunny side up", "is all systems go",
//      "is well up", "is breaking the bank", "is getting out of bed", "is sending it through the roof", "is going to the extreme", "is no stranger to winning","is breaking through the clouds", 
//      "has all bases covered", "get up on it", "climb up on", "is all the rage", "is walking on sunshine", "is flying on high", "is in the lead", "is in good spirits", 
//        "is in the mood", "is up to snuff", "is flying high"];

// let symbol= [":rocket:"," :D ", ":hot: :rocket:", ":sun:",":rocket: :star:", ":shades: :cloud: :rocket: :star:",":rocket: :rocket: " ];
//     document.getElementsByClassName("message-input")[0].value = subject[getRandomInt(subject.length -1)] + ' ' + verb[getRandomInt(verb.length -1)] + " " + symbol[getRandomInt(symbol.length -1)];
//     var txtbox = document.getElementsByClassName("message-input")[0];
//     txtbox.onkeydown = function (e) {
//         if (e.key == "Enter") {

//         }
//         // e.preventDefault();
//     };

// var ev = new KeyboardEvent('keydown', {
//     altKey: false,
//     bubbles: true,
//     cancelBubble: false,
//     cancelable: true,
//     charCode: 0,
//     code: "Enter",
//     composed: true,
//     ctrlKey: false,
//     currentTarget: null,
//     defaultPrevented: true,
//     detail: 0,
//     eventPhase: 0,
//     isComposing: false,
//     isTrusted: true,
//     key: "Enter",
//     keyCode: 13,
//     location: 0,
//     metaKey: false,
//     repeat: false,
//     returnValue: false,
//     shiftKey: false,
//     type: "keydown",
//     which: 13
// });

//     txtbox.dispatchEvent(ev);
// }

// var ev = new KeyboardEvent('keypress', {

//     key: 0
// }); 
// Array.from(document.querySelectorAll("[aria-label]")).filter(x=> {let d = x.getAttribute("aria-label")
// if(d && d.includes("Like this"))return true;
// return false;
// } ).map(x=>x.childNodes[0])[0].dispatchEvent(ev)
// true



// (function loop() {
//     let randomTimes = [600000,300000,180000,420000];
//     let rand = randomTimes[getRandomInt(randomTimes.length-1)]
//     setTimeout(function() {
//             action()
//             loop();  
//     }, rand);
// }());

//1910/1933/1952


// Ich muss mich entschuldigen, aber Englisch ist meine starke Sprache.
// I wonder if you know what it is like to have the whole world demean and demonize you?  To work harder than the rest and be prevented from rising. To be called Huns, Tatars, and every other label that describes a savage and uncivilized brute. Kicked, spit on, and molested.  Invaded and violated from every corner. I wonder if you know what that is like, to have invaders from every corner of the world come and fill their war chests with gold and take the very best, the smartest, the noblest, and the most beautiful. I wonder what it must be like to have wounds kept open, left to fester and bleed, in the form of video games, movies, and other entertainment.  I think you can afford these unfortunate people some empathy and understanding.   
// 
// 
// 
// 


// const dict= {};

// const nums={};
// const placement={}

// let dom = document.getElementsByClassName('ch-data')[0];
//  dom.addEventListener('DOMNodeInserted',(event)=>{
//       let sentence = event.target.textContent
//      if(!sentence.contains('minutes ago')){
// console.log('event insert--> ', event.target.textContent);
// let words = sentence.split(" ");

// while(words.length){
//     let key =  words.unshift();
//     nums[key] = (nums[key]||0 )++;
//     let sentence = words.join(' ')
//     placement[sentence] =(pacement[sentence]||0 )++
//     dict[key] = dict[key] ? dict[key]:[];
// dict[key][placement[sentence]]= sentence;



// }


//      }
// })

// const Cash = require('./cash.js');
// const Freqency = Cash.LFUCache(300);

/**
[id, [adjacent], visits]

*/









function is_in_memory(sentence) {
    let temp_dict = dict;
    while (sentence.length) {
        let word = sentence.shift()
        if (temp_dict[word]) {
            temp_dict = demp_dict[word]
        } else return temp_dict;
    }
}

const response = "I'm doing fine, how about you?";

const incadence = {};



function MarkovWit() {
    let instance = {
        t: 0
    };
    let f = [instance, instance, instance]
    instance.t++


    const word_lex = [];
    const dict = {};
    const converstaion_time_line = [];
    let adjacent_matrix = [];
    const parent = {};
    const number_toword = {}
    const frequencies = {};
    const conversations = ["hi my name is mark", "hi my name is dave name", "i hi my",
        "hi I like butts", "hi I", "hi jo", "hi jo", "hi mark", "so how are you doing today?"
    ];
    let i = 0;
    return {
        run_catagorization,
        push_sentence,
        get_percentages,
        getRandomInt,
        adjacent_matrix,
        frequencies,
        number_toword,
        dict,
        conversations
    };

    function* run_catagorization(conversation) {
        conversations.push(conversation)
        for (; i < conversations.length; i++) {
            if (i === conversations.length - 1){
                let b = conversations.length
                conversations
                b
                i
                 
                yield "ready to process more, total responses processed: " + i;

            }
            const statment = conversations[i]
            catagories_sentences(statment);
        }
    }

    function push_sentence(sentence) {
        return [...run_catagorization(sentence)];
    }

    function catagories_sentences(sentence) {
        sentence = sentence.trim();
    
        let words = sentence.split(" ");
        let temp_words = words.map(word => word)
        temp_words
        while (temp_words.length) {
            let word = temp_words.shift();
            if (typeof parent[word] === 'undefined') {
                parent[word] = adjacent_matrix.push(
                    []
                ) - 1;
                number_toword[parent[word]] = word;
            }
           
        }

        while (words.length) {
            let word = words.shift();
            let id = parent[word];
            if (words.length) {
                let node = parent[words[0]];
                if (!frequencies[id] && frequencies[id] !== 0) {
                    frequencies[id] = {}
                    frequencies[id].total = 0
                }
                if (typeof ((frequencies[id] || {})[node]) === 'undefined') {
                    const visiting_node = adjacent_matrix[id].push([parent[words[0]], 1]) - 1;
                    frequencies[id].total += 1
                    frequencies[id][node] = {};
                    frequencies[id][node].i = 1
                    frequencies[id][node]['v'] = visiting_node;
                    adjacent_matrix[id][frequencies[id][node]['v']][2] = frequencies[id]
                } else {
                    frequencies[id][node].i++;
                    let adj_node = frequencies[id][node]
                    adjacent_matrix[id][frequencies[id][node]['v']][1] = frequencies[id][node].i;
                    frequencies[id].total++;

                    // adjacent_matrix[id][frequencies[id][node]['v']][2] =  frequencies[id];
                }

            }
        }
        let k = parent['how']
        k
    }

    function get_percentages() {
        let percentages = [];
        adjacent_matrix.forEach((node, node_id) => {
            node.forEach((adjacent_node, adjacent_node_id) => {
                if (adjacent_node.length) {
                    const total = frequencies[node_id].total
                    let percent = Math.floor(adjacent_node[1]).toPrecision(3)
                    percent = percent / total
                    adjacent_matrix[node_id][adjacent_node_id][2] = percent.toPrecision(2)
                    percentages[node_id] = (percentages[node_id] || [])
                    percentages[node_id][adjacent_node_id] = (percentages[node_id][adjacent_node_id] || [])
                    let n = adjacent_node
                    percentages[node_id][adjacent_node_id] = [n[0], percent.toPrecision(2) * 100]
                }
            })
        })
        return percentages
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function derangments(n) {
        let stack = [];
        let g = [
            [
                [], 0, n
            ]
        ];
        while (g.length) {
            q = g.pop();
            let [p, i, k, is] = q;
            if (k--) {
                if (k ^ i && !p.includes(k)) {
                    g.push([
                        [...p, k], i + 1, n
                    ]);
                }
                g.push([p, i, k])
            } else {
                i ^ n || stack.push(p)
            }
        }
        return stack.reverse()
    }
}

let mark = MarkovWit();


let running = mark.push_sentence(response)

running

let percent = mark.get_percentages()


percent

let rand = mark.getRandomInt(0, percent.length - 1)
rand

let starting_node = percent[rand]







let word = mark.number_toword[10];
let obj = mark.adjacent_matrix[0][0][2]

console.log("frequencies ", mark.frequencies)



console.log(mark.adjacent_matrix)
file.on('error', function (err) {
    /* error handling */
});
file.write("source,target,value" + "\n")
mark.adjacent_matrix.forEach((v, i) => {
    v.forEach((adj_node) => {
        file.write(`${mark.number_toword[i]},${mark.number_toword[adj_node[0]] },${adj_node[1]} \n`);
    })
});
console.log("number to word   ", mark.number_toword);

function check_counts_for_nodes() {
    let counts = {}
    mark.conversations.forEach(values => {
        let words = values.split(" ");
        words.forEach((word, i) => {
            const len = words.length - 1;
            if (!counts[word]) {
                counts[word] = 1
            } else if (len !== i) {
                counts[word]++;
            }
        })
    })

    let total_visits = {};
    mark.adjacent_matrix.forEach((adjacent, node) => {
        adjacent.forEach(([adjacent_node, visits]) => {
            if (!total_visits[node]) {
                total_visits[node] = visits
            } else total_visits[node] += visits;
        })
    })

    const all_match = Object.entries(total_visits).every(([key, value]) => {
        let word = mark.number_toword[key]
        let number_of_visits_from_total_visits = total_visits[key];
        let number_of_visits_from_counts = counts[word];
        return counts[mark.number_toword[key]] === total_visits[key]

    })

    return all_match

}

let c = check_counts_for_nodes()

c
// while (converstaion_time_line.length) {

//     let statment = conversation_time_line.shift();

//     while (statment.length) {

//         let word = statment.shift();
//         for (let second_statment_word of conversation_time_line[0]) {


//             incadence[word] = Object.keys(is_in_memory(second_statment_word))

//         }

//     }




// }


function search(sentence) {
    let words = sentence.split(" ")


    while (words.length) {





    }


}



const print = (x) => console.log(x);

// let i = -~0
// let s = 4

// let n = i^s
// n
// let zm =0

// let l = -~zm

// l



let o = [0, 1, 2, 3, 4]
let arr = [o]
o.forEach((x, i) => {
    if (i > 0) arr.push([i])
})




function derangments(n) {
    let stack = [];
    let g = [
        [
            [], 0, n
        ]
    ];
    while (g.length) {
        q = g.pop();
        let [p, i, k, is] = q;
        if (k--) {
            if (k ^ i && !p.includes(k)) {
                g.push([
                    [...p, k], i + 1, n
                ]);
            }
            g.push([p, i, k])
        } else {
            i ^ n || stack.push(p)
        }
    }
    return stack.reverse()
}





let stac = derangments(4)
console.log(stac)











// console.log(dict)


// function find_user_object(msg) {
//     let queue = [{
//         node: msg,
//         path: 'root'
//     }];
//     let obj;
//     let paths_explored = [];
//     while (queue.length) {
//         let entity = queue.pop();
//         obj = entity.node;
//         paths_explored.push(entity.path);
//         let keys = Object.keys(obj)
//         if (obj.visited) continue;
//         obj.visited = true;
//         for (let key of keys) {
//             if (key === 'user') {
//                 paths_explored.push(key);
//                 obj = obj.user
//                 queue.length = 0;
//                 break;
//             } else if (typeof obj[key] === 'object' && obj[key] != null) {
//                 queue.push({
//                     node: obj[key],
//                     path: key
//                 });
//             }
//         }
//     }
//     console.log(paths_explored)
//     return [obj]
// }
// let k ={something:{}};


// k.something ={man:{circle:k, stuff:{user:{not:"stuff"},other:{user:{}},user:{inside:"inside user"}}}}

// console.log('user --> ', find_user_object(k));







