const PORT=3000;
import ConnectDB from './db/index.js'
import app from './app.js'
import dotenv from 'dotenv'
dotenv.config();

app.listen(PORT, async()=>{
try {
await ConnectDB();   
} catch (error) {
console.log(error.message);    
}
})
