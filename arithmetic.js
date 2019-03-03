"use strict";

function toPack(value) {
    var symbols = {};

    for (var i = 0; i < value.length; i++) {
        if (symbols[value[i]] == null) symbols[value[i]] = {count: 0, low: 0, high: 0};
        symbols[value[i]].count+=1;
    }

    var tmp = 0;
    for (var i in symbols) {
        symbols[i].low = tmp;
        tmp = tmp + symbols[i].count / value.length;
        symbols[i].high = tmp;
    }

    var low = 0;
    var high = 1;
    symbols.all = 0;
    for (var i = 0; i < value.length; i++) {
        var tmp = low + (high - low) * symbols[value[i]].high;
        low = low + (high - low) * symbols[value[i]].low;
        high = tmp;
        symbols.all += 1;
    }

    console.log(symbols);
    console.log(low);
    console.log(symbols.all);
    symbols.code = low;
    return symbols;
}

function decode(obj) {
    var result = '';

    var code = obj.code;
    for (var i = 0; i < obj.all; i++) {
        for (var key in obj) {
            if ( (obj[key].low <= code) && (obj[key].high >= code)) {
                result += key;
                code = (code - obj[key].low)/(obj[key].high-obj[key].low);
                break;
            }
        }
    }

    return result;
}

// var str = prompt('Введите кодируемую последовательность:', '');
// alert( toPack(str).code );

var str = "1112223"
var obj = toPack(str);
console.log(decode(obj));