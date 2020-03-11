/*오늘은 node.js에서 압도적으로 많이 사용되는  express 객체를 
이용하여 서버를 구축해 본다!! 
이에 앞서, 왜 기존의 http모듈만으로 서버를 개발햇을때 
불편한지 느껴보자..
*/
var fs = require("fs");
var WebSocket = require("ws"); //WebSocket 모듈
//post방식으로 전달된 데이터를 처리해주는 모듈 추가 
var bodyParser = require("body-parser");

//http 모듈만으로 서버를 개발하려면 많은 코드량 및 기능이 부족하다 
//이러한 문제점을 개선하기 위해 개발된 모듈이 express 이다 
//  http vs  express  (많은기능)
var express = require("express"); //외부 모듈
var app = express(); //express객체 생성

//정적 페이지가 많을 경우 아래의 코드가 함께 늘어나야 한다...
//요청 url에 따른 라우팅을 일일 명시해야 한다..( 정적html에 대해서..)
//express 모듈은 미들웨어라는 함수를 지원한다!! 
//이 미들웨어 중 정적자원을 처리하는 static() 을 이용해본다!!
console.log("웹사이트의 루트 경로 ",__dirname);
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true})); //for form send
app.use(express.json()); //for json 


//클라이언트의 요청마다 그 요청을 처리할 로직을 작성..
app.post("/regist", function(request, response){
    //console.log("request.params" , request.params);
    //console.log("request.body" , request.body);
    //bodyParser에 의해 body로 전달된 파라미터를 인식하게
    //되었으므로, 사용해보자!! 
    console.log(request.body);
    //console.log("lat:", lat, "lng:", lng, "content:",content);

    //입력 폼에서 전송된 파라미터를 , 맵브라우저들에게 전송 
    send(request.body);
});


app.use(function(request , response){
    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});    
    response.end("express test");
});

app.listen(9999, function(){
    console.log("Server is running at 9999 port...");
});

//웹소켓 관련 로직!!!
var socketServer = new WebSocket.Server({port:7979});
var socketArray=[]; //접속하는 맵클라이언트들을 보관할 배열


//이벤트 처리 
socketServer.on("connection", function(socket){
    socketArray.push(socket);
    console.log("현재 접속자 ", socketArray.length,"명");
});

//접속한 모든 맵 클라이언트 브라우저에게 정보를 전달하자!!
//출력 ( send)
function send(data){
    console.log("맵에게 보낼 데이터는 ", data);
    
    //접속한 모든 맵 브라우저에게 브로드케스팅하자!!
    for(var i=0;i<socketArray.length;i++){
        socketArray[i].send(JSON.stringify(data));
    }
}









