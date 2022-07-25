



// split absolute purchase into smaller portions for exmaple 10k / 


function split_purchase_price(dollar_amount,split, price){
let d_split = dollar_amount/split 
let shares = dollar_amount/price

shares 

shares_per_split = d_split/price 


let range = Array(split).fill(shares_per_split)


     range
     

let price_step=[]


let avg = [10.00, 8.00]




     for(let share of range){

             price *    


     }

shares_per_split









}



split_purchase_price(10000,20, 8.00)





function balancedJars() {
    let jars = Array(10).fill(Array(10).fill(1))
    let incrementTotal = 1
    incrementTotal = jars.reduce((acc, a) => {
        acc += incrementTotal++ * a[0]
        return acc
    }, 0)
    return incrementTotal
}

function jarIndex(jar) {
    let skewed = 1
    skewed = jar.reduce((aac, a) => {
        aac += skewed++ * a[0]
        return aac
    }, 0)
    return skewed - balancedJars()
}
let jars = Array(9).fill(Array(10).fill(1))
jars.push(Array(10).fill(2))
console.log(jarIndex(jars)) 




