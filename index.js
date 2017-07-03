const request = require('request');
const merge = require('merge');

let res = [];
let errors = [];
let totalCounter = 0;
let config = {
    timeout: 50,
    logtotal: true
}

function callNext(urlFull, callback) {
    new Promise(() => {
        request(urlFull, function (error, response, body) {
            if (error) {
                callback(null, error);
            } else {
                callback(body);
            }
        });
    });
}

function* iter(urls, callback, next) {
    for (k in urls) {

        yield callNext(urls[k], function (as, error) {
            if (error) {
                setTimeout(function () {
                    errors.push(JSON.parse(error))
                    if (config.logtotal) {
                        console.log(`${++totalCounter} out of ${urls.length} downloaded`);
                    }
                    next();
                }, config.timeout);
            } else {
                setTimeout(function () {
                    res.push(JSON.parse(as));
                    if (config.logtotal) {
                        console.log(`${++totalCounter}out of ${urls.length} downloaded`);
                    }
                    next();
                }, config.timeout);
            }
        });
    }
    callback(res, errors);
}

const downloadUrls = function (urls, callback, options) {
    merge(config, options);
    let gen = iter(urls, callback, function () {
        gen.next();
    });
    gen.next();
}

module.exports = downloadUrls;
