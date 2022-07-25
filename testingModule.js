function add (a,b)
{
    if (a.constructor !== Number || b.constructor !== Number) return Error("both values must be a number");
    if (!a && !b) return 0;
    if (b && !a) return b;
    if (a && !b) return a;

    return (a + b) / 2;    


}

console.log(add(2, 3))

module.exports =  add ;