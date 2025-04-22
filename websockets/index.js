import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app=express();
const server=http.createServer(app);
const io=new Server(server);
//io handles socket, http request for express
io.on('connection', (client)=>{
client.on('chatMessage', (message)=>{
console.log("A new message received",message);
io.emit('chatMessage',message);
})
})

app.use(express.static(path.resolve("./public")));

app.get('/', (req,res)=>{
return res.sendFile("/public/index.html");
})
server.listen(3000,()=>{
console.log(`listening on port 3000`);
})
