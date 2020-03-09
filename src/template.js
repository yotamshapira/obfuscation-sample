let x = "HERE WILL BE MY HIDDEN STRING";
let regExp = new RegExp("[_REGEXP_]", "g");
x =  x.replace(regExp, "").split(";");

function foo(str) {
    alert(str);
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}

if (getRandomInt(1, 2) !== 1) {
    // Once every 2 runs we use the secret string
    foo(x);
}
