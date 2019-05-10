

// const moduleArr = [7, 2, "Hello World", 11, "node", "server", 8, 1]
// module.exports = {
//     evalElement: (arr) => {
//         for (var i = 0; i < arr.length; i++) {
//             if (typeof (arr[i]) == 'number') {
//                 if (arr[i] % 2 == 0) {
//                     console.log("짝수입니다 : " + Math.pow(2, arr[i]));
//                 }
//                 else {
//                     console.log("홀수입니다");
//                 }
//             }
//             else if (typeof (arr[i] == 'string')) {
//                 console.log(arr[i].split('').reverse().join(''));
//             }

//         }
//     }
// }
// const test = require('./test');

// test.evalElement(moduleArr);

const http = require('http');
const server = http.createServer((request, response) => {
    console.log('성공이다');
}).listen(3000, () => {});

