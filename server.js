const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const TaskModel = require('./models/Tasks')


const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/taskmanagementapp",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.get('/', (req, res) => {
    TaskModel.find({})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))

})

app.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const task = await TaskModel.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


app.get('/getTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findById({ _id })
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))

})


app.put('/updateTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate({ _id: id }, {
        task: req.body.task,
        description: req.body.description,
        duration: req.body.duration
    })
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))
})

app.delete('/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete({ _id:id})
        .then(res => res.json(res))
        .catch(err => res.json(err))
})

app.post("/createTask", (req, res) => {
    TaskModel.create(req.body)
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))

})
  



app.listen(8080,()=> {
    console.log("Server is Running")
})