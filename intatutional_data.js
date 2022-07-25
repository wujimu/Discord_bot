const url = 'https://cloud-sse.iexapis.com/stable/stocksUSNoUTP?token=sk_2b4b9f7b12f64e778badaa34f9fdd3b3&symbols=spy'

'use strict';
const request = require('request');
var stream;
var partialMessage;

function connect() {
    stream = request({
        url: 'https://cloud-sse.iexapis.com/stable/stocksUSNoUTP?token=pk_60a663515a5c4fe19567a5bd021583cb&symbols=spy,ibm,twtr',
        headers: {
            'Content-Type': 'text/event-stream'
        }
    })
}
connect();

stream.on('socket', () => {
    console.log("Connected");
});

stream.on('end', () => {
    console.log("Reconnecting");
    connect();
});

stream.on('complete', () => {
    console.log("Reconnecting");
    connect();
});

stream.on('error', (err) => {
    console.log("Error", err);
    connect();
});


stream.on('data', (response) => {
    var chunk = response.toString();
    var cleanedChunk = chunk.replace(/data: /g, '');

    if (partialMessage) {
        cleanedChunk = partialMessage + cleanedChunk;
        partialMessage = "";
    }

    var chunkArray = cleanedChunk.split('\r\n\r\n');

    chunkArray.forEach(function (message) {
        if (message) {
            try {   
                var quote = JSON.parse(message)[0];
                console.log(quote);
            } catch (error) {
                partialMessage = message;
            }
        }
    });
});

function wait () {
    setTimeout(wait, 1000);
};

wait();
