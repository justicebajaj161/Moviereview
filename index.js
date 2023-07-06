import express from "express";
import Connection from "./database/db.js";
import dotenv from 'dotenv'
import cors from 'cors';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Router from "./Routes/Router.js";


const app=express();
dotenv.config();
app.use(cors());

app.use(express.json())

const currentModuleUrl = import.meta.url;

// Convert the URL to a file path
const currentModulePath = fileURLToPath(currentModuleUrl);

// Get the directory path of the current module
const currentDir = dirname(currentModulePath);
app.use(express.static(join(currentDir, 'frontend', 'build')));

app.use('/api/auth',Router);


app.get('*', (req, res) => {
    res.sendFile(join(currentDir, 'frontend', 'build', 'index.html'));
  });

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
Connection(username,password);

const PORT=process.env.PORT||8000;

app.listen(PORT,()=>{
    console.log(`running at port ${PORT}`)
});

