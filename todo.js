const fs = require("fs");
const express = require("express");
const { title } = require("process");
const { error } = require("console");
const app = express();
app.use(express.json());


let todos=[];
app.get("/todos", function (req, res) {
    res.json(todos);
});

app.post("/todo",function(req,res){
    const todo={
        id:todos.length+1,
        title:req.body.title,
        iscompleted:req.body.completed || false
    }
    todos.push(todo);
    res.status(201).json({
        msg:'your todo added succussfully',
        todo:todo
    })    
})

app.put("/todos/:id",function(req,res){
    const id=parseInt(req.params.id);
    const todo=todos.find((t)=>t.id==id);
    if(!todo){
        return res.status(404).json({error:"Todo not found"});
    }
    todo.title=req.body.title || todo.title;
    todo.iscompleted=req.body.iscompleted || todo.iscompleted;
    res.status(201).json({
        msg:"todo updated succussfully",
        todo:todo
    })
})


app.delete("/todos/:id",function(req,res){
    const id=parseInt(req.params.id);
    const todo=todos.findIndex((t)=>t.id==id);
    if(todo==-1){
        return res.status(404).json({error:"todo not found"});
    }
    todos.splice(todo,1);
    res.status(201).send("deleted succussfully!");
})
app.listen(3000);