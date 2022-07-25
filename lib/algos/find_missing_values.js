//queries [[]]
function arrayManipulation( n, queries) {

  let arry = new Array(n+1).fill(0);
  let maxum = 0;
    
     qu =  queries;
    
    
    
    while(qu !=queries.end())
    {
        int first = qu->front()-1;
        int second= qu->at(1);
       
        long value = static_cast<long>(qu->back());
        
        while(first != second)
            {
                arry[first]+= value; 
                maxum = Math.max(maxum, arry[first]);
                first++;
            };
    qu++;
    
    };
    return maxum;
    
    };