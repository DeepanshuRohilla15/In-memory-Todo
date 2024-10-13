
let todos = [];
let currentId = 1;

async function getAllTodo(req, res, next){
    res.json(todos);
}

async function createTodo(req, res, next){
    const task = req.body;
    const newTodo = {id: currentId++, task};
    todos.push(newTodo);
    res.status(201).json(newTodo);
}

