'use strict';

 let http = require('http');

const routingTable = require('./config.json');

 let serve = (response, fname, datatype) => {
 let fs = require('fs');

 fs.readFile(fname, (err, data) => {
 if (err) {
 console.log(' 檔案讀取錯誤');
 }
 else {
 response.writeHead(200, {
 'Content-Type': datatype
 });


 response.write(data);
 response.end();
 }
 });
 };

 http.createServer((request, response) => {
 let fs = require('fs');

 let postData = '';


 request.on('data', (chunk) => {
 postData += chunk;

 console.log(
 ' 接收的 POST data ⽚段 k: [' + chunk + '].'
 );
 });

 request.on('end', () => {
 if (request.url in routingTable) {
 let obj = routingTable[request.url];

 serve(response, obj.url, obj.type);
 }
 else {
 console.log(' 未定義的存取: ' + request.url);

 response.end();
 }
 });
 }).listen(8088);

 // log message to Console
 console.log(' 伺服器啓動，連線 url: http://127.0.0.1:8088/');

 // index.js