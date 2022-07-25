

/** 
 * @param {number} val
 * @return {number}
 */
function MovingAverage (range) {

    let size=range
    let window=[]
    let total=0

    return {next}
    function next (val){
       if(window.push(val) <= size) total+=val;
        else{
          total-= window.shift();
            total+=val;
        }
    return total/window.length;
    }
}




module.exports = {MovingAverage}