import {config} from 'dotenv'
import conndb from'./data/dbconnect.js'

config({
    path:'./config.env'
})
import { app } from "./app.js";

const PORT = process.env.PORT || 4000;
conndb()
app.listen(PORT, ()=>{
    console.log(`listening on  port:${PORT}`)
})


