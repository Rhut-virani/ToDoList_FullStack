const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Todo-list')
const db = mongoose.connection;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTION");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
next();
});

const Todo = require('./models/Todo');

app.get('/todo', (req,res)=>{
    Todo.find({})
    .then(results=>{
    res.send(results);
    })
    .catch(error=>{ 
    console.log(error);
    })
});


app.post('/todo', (req,res)=>{
    let newTodo = Todo(req.body);
    console.log(newTodo)
    newTodo.save()
    .then(savedTodo=>{
      console.log(savedTodo);
      Todo.find({})
      .then(results=>{
      res.send(results);
      })
      .catch(error=>{ 
      console.log(error);
      })
    })
    .catch(error=>{
        console.log(error);
    })

});

app.delete('/todo', (req,res)=>{
    let deleteTodo = req.body.cleartodo;
    deleteTodo.map(element=>{
    Todo.remove({"_id" : element._id})
        .then(results=>{
            console.log(results);
        })
        .catch(error=>{
            console.log(error);
                })
    })
    Todo.find({})
    .then(results=>{
    res.send(results);
    })
    .catch(error=>{ 
    console.log(error);
    })
})

app.put('/todo', (req,res)=>{
    let updateId = req.body.data.element;
    Todo.update(
        { _id: updateId._id},
        {$set: {chkbox: updateId.chkbox}}
        )
        .then(results=>{
            console.log(results);
            Todo.find({})
                .then(results=>{
                res.send(results);
                })
                .catch(error=>{ 
                console.log(error);
                })
        })
        .catch(error=>{
            console.log(error);

        })
})
app.listen(8080, ()=>{
    console.log('server listening on port 8080');
})
