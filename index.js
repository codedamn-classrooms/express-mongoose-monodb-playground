import express from 'express'
import mongoose from 'mongoose'
import Todo from './models/todo.js'



const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


mongoose
  .connect('mongodb://localhost/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



app.get("/", (req, res) => {
    Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.send(err));
})

app.post('/add', (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });

  newTodo
    .save()
    .then(() => res.send('Todo added successfully'))
    .catch(err => console.log(err));
});


app.listen(1337, console.log("Express server listening on 1337"))