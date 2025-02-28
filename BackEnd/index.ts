import express from 'express'
import router from './routers'
import * as dotenv from 'dotenv';
// import multer from 'multer'; // For handling multipart/form-data
import bodyParser from 'body-parser'; // For parsing JSON data
import cors from 'cors';
dotenv.config()

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parses application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})