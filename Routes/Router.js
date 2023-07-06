import express from "express";
import { Login, Register } from "../controller/user-controller.js";
import { getallmovies, getthemoviebyid, postMovie, postuserrating } from "../controller/movies-controller.js";



const Router= express.Router();



Router.post('/register', Register)
Router.post('/login', Login)

Router.post('/postmovie',postMovie)
Router.get('/getallmovies',getallmovies)
Router.get('/getthemoviebyid/:id',getthemoviebyid)
Router.post('/postrating',postuserrating)


export default Router;