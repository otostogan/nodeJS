const path = require('path');

// Работает с путями в файловой системе


console.log(path.basename(__filename)); // path_ref.js
console.log(path.dirname(__filename)); // D:\js\JSWORK\node\basics\refs
console.log(path.extname(__filename)); // .js

console.log(path.parse(__filename)); //{root: 'D:\\',dir: 'D:\\js\\JSWORK\\node\\basics\\refs',base: 'path_ref.js',ext: '.js',name: 'path_ref'}




console.log(path.join(__dirname, 'test', 'second.html')); // D:\js\JSWORK\node\basics\refs\test\second.html


console.log(path.resolve(__dirname, 'test', 'second.html'));