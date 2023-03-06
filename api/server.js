import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Todo from "./model/Todo.js"

const app = express();

app.use(express.json());
app.use(cors());

// const URL = "mongodb+srv://anish:anish@cluster0.o1nboj6.mongodb.net/?retryWrites=true&w=majority"
const URL = "mongodb://localhost:27017/mern-todo";
try {
    mongoose.connect(URL,{
        useUnifiedTopology : true, useNewUrlParser: true 
    });
    console.log("Database has been connected");
} catch (error) {
    console.log("Error detected during connecting the error", error);
}

//Mongoose code here
app.get("/todos", async(req,res) =>{
    const todos = await Todo.find();

    res.json(todos);
})

app.post("/todo/new", (req, res) =>{
    const todo = new Todo({
        text: req.body.text
    })
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.get('/todo/complete/:id', async(req,res)=>{
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.listen(3001, ()=> console.log("Server is running at 3001"));