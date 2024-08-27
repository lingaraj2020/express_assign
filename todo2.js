const express = require('express');
const bodyParser=require("body-parser");
const fs=require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

fs.readFile('todos.json','utf-8',function(err,data){
    if(err){
        console.log(err);
    }
    if(data){
        JsonData=JSON.parse(data);
    }
})

app.get("/todos",function(req,res){
    res.send(JsonData);
})

app.post("/todo",function(req,res){
    const todo={
        id:JsonData.length+1,
        title:req.body.title,
        completed:req.body.completed
    }
    JsonData.push(todo);
    fs.writeFile('todos.json',JSON.stringify(JsonData),(err)=>{
        if(err) throw err;
        res.status(201).json({
            msg:"todo created succussfully",
        })
    })
})

app.put("/todos/:id",function(req,res){
    const id=parseInt(req.params.id);
    const index=JsonData.find((t)=>t.id===id);
    if(!index){
        return res.status(404).send("Todo not found");
    }
    index.title=req.body.title || index.title;
    index.completed=req.body.completed || index.completed;

    fs.writeFile('todos.json',JSON.stringify(JsonData),(err=>{
        if(err) throw err;
        res.status(200).json({
            msg:"todo updated succussfully",
            todo:index
        })
    }))
})

app.delete("/todos/:id",function(req,res){
    const id=parseInt(req.params.id);
    const index=JsonData.findIndex((t)=>t.id===id);
    if(index==-1){
        return res.status(404).json({msg:"todo not found"});
    }
    JsonData.splice(index,1);
    fs.writeFile('todos.json',JSON.stringify(JsonData),(err)=>{
        if(err) throw err;
        res.status(200).json({
            msg:"todo Deleted succussfully",
        })
    })
})

app.delete("/todos",function(req,res){
    JsonData=[];
    fs.writeFile('todos.json',JSON.stringify(JsonData),(err)=>{
        if(err) throw err;
        res.status(200).json({
            msg:"all todos Deleted succussfully",
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}); 