// import app from './app.js'
import {server} from './utils/socket.js'
import dotenv from 'dotenv'
dotenv.config();
const PORT=process.env.PORT||3000;
import ConnectDB from './db/index.js';


server.listen(PORT, async()=>{
try {
await ConnectDB();
console.log(`listening on port ${PORT}`);
} catch (error) {
console.log("error conneting to db");   
}
})
