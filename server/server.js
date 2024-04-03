import express from "express"
import ConnectToDatabase from "./database/db.js"
import dotenv from "dotenv"
import { LOCAL_PORT } from "./constants.js"
import cors from "cors"
import router from "./routes/route.js"
import bodyParser from "body-parser"

const app = express()
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use("/",router)
const PORT = LOCAL_PORT

dotenv.config()
const DB_USER=process.env.DB_USERNAME
const DB_PWD=process.env.DB_PASSWORD


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))


ConnectToDatabase(DB_USER,DB_PWD);