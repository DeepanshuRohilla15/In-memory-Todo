const express = require ("express");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "iamthebest"

import {getAllTodo, createTodo, updateTodo, deleteTodo, searchTodo} from './routes/todo';

const app = express();
const PORT = 3001
const users = []
app.use(express.json());


app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You have signup"
    })
})

app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;

    for(let i = 0; i  < users.length; i++){
        if(users[i].username == username && users[i].password == password){
            founduser = users[i]
        }
    }

    if(founduser){
        const token = jwt.sign({
            username: founduser.username
        }, JWT_SECRET)
        res.json({
            token: token
        })
    }
    else{
        res.status(403).send({
            message: "Invalid credentials"
        })
    }
})

function auth(req, res, next){
    const token = req.headers.token;
    const decodeData = jwt.verify(token, JWT_SECRET)

    if(decodeData.username){
        req.username = decodeData.username
        next()
    }
    else
    {
        res.json({
            message: "You are not logged in"
        })
    }
}

// Get All Todos
app.get("/todos", auth, getAllTodo);

//Add a new todo
app.post("/todos",auth,  createTodo);

//Update a todo
app.put("/todos/:id",auth, updateTodo);

//Delete a todo
app.delete("/todos/:id",auth, deleteTodo);

// Search todo
app.get("/todos/search", auth, searchTodo);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
