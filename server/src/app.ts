import express from 'express';
import dotenv from 'dotenv';
import {connection} from './config/database';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import adminRoute from './routes/adminRoutes';
import empRoute from './routes/empRoutes';
import cors from 'cors';

connection()

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(logger('dev'))
app.use(cors())
app.use('/employee', empRoute)
app.use('/admin', adminRoute)


app.listen(process.env.PORT || 4000, ()=>{
    console.log(`Dancing on port ${process.env.PORT || 4000}`)
})