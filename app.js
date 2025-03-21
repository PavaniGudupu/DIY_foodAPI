import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import {it} from 'node:test';
import cors from 'cors';
import { REPLServer } from 'repl';


const app = express();
const port = 3000;
const APP_URL = "http://localhost:4000"
const masterkey = "6750552602";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());


//Home route
app.get("/", async(req, res) => {
    try{
        const response = await axios.get(APP_URL + '/all');
        const request = response.data;
        console.log(request);
        res.json(request);
    } catch(error) {
        console.log(error.message);
    }
});


//Random data
app.get("/random", async(req, res) => {
    try{
        const response = await axios.get(APP_URL + '/random');
        const request = response.data;
        console.log(request);
        res.json(request);
    } catch(error) {
        console.log(error.message);
    }
});


//Retreive data with specific id
app.get("/data/:id", async(req, res) => {
const id = req.params.id;
    try{
        const response = await axios.get(`${APP_URL}/specific/${id}`);
        const request = response.data;
        console.log(request);
        res.json(request);
    } catch(error) {
        console.log(error.message);
    }
});



//Retreive data with category
app.get("/filter", async(req, res) => {
    const category = req.query.category;
        try{
            const response = await axios.get(`${APP_URL}/filter?category=${category}`);
            const request = response.data;
            console.log(request);
            res.json(request);
        } catch(error) {
            console.log(error.message);
        }
    });


//Add the data
app.post("/add", async(req, res) => {
    const data = {

        name: req.body.name,
        img: req.body.img,
        content: req.body.content,
        category: req.body.category,
        score: req.body.score
    }
        try{
            const response = await axios.post(`${APP_URL}/post`, data);
            const request = response.data;
            console.log(request);
            res.json(request);
        } catch(error) {
            console.log(error.message);
        }
    });



//Update the data
app.put("/update/:id", async(req, res) => {
    const id = req.params.id;
    const data = {
        name: req.body.name,
        img: req.body.img,
        content: req.body.content,
        category: req.body.category,
        score: req.body.score
    }
        try{
            const response = await axios.put(`${APP_URL}/put/${id}`, data);
            const request = response.data;
            console.log(request);
            res.json(request);
        } catch(error) {
            console.log(error.message);
        }
    });





//Patch the data
app.patch("/partialUpdate/:id", async(req, res) => {
    const id = req.params.id;
    const data = {
        id: id,
        name: req.body.name,
        img: req.body.img,
        content: req.body.content,
        category: req.body.category,
        score: req.body.score
    }
        try{
            const response = await axios.patch(`${APP_URL}/patch/${id}`, data);
            const request = response.data;
            console.log(request);
            res.json(request);
        } catch(error) {
            console.log(error.message);
        }
});



//delete the data
app.delete("/smash/:id", async(req, res) => {
    const id = req.params.id;
        try{
            const response = await axios.delete(`${APP_URL}/delete/${id}`);
            const request = response.data;
            console.log(request);
            res.json(request);
        } catch(error) {
            console.log(error.message);
        }
});

    
app.listen(port, (req, res) => {
    console.log(`Server running on port: http://localhost:${port}`);
})