var qs = require('qs');
var ncp = require('copy-paste');

function replaceStrings(obj){
    if (obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) ) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                        obj[key] = replaceStrings(obj[key]);
                    }
                if (Array.isArray(obj[key])) {
                    obj[key] = replaceStrings(obj[key]);
                }
                const result = parseInt(obj[key], 10);
                if (!isNaN(result) && result.toString(10).length === (obj[key]).length && !Array.isArray(obj[key])) {
                    obj[key] = result;
                } else {
                    if (obj[key] === 'true') {
                        obj[key] = true;
                    } else if (obj[key] === 'false') {
                        obj[key] = false;
                    } else if (obj[key] === '') {
                        obj[key] = null;
                    }
                }
            }
        } 
    }
    return obj;
}

//absenceLimits:{
//    days: [0
//}


let urlString = process.argv[2];
let paramsIndex = urlString.indexOf('?', 0);
if (paramsIndex !== -1) {
    urlString = urlString.slice(paramsIndex+1);
}

let resultParse = qs.parse(urlString);
let resultConvert = replaceStrings(resultParse)
let resultString = JSON.stringify(resultConvert);

ncp.copy(resultString)
console.log('\n\n'+ resultString);

