const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('express');
const formateDate = require('./assets/date');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/mongoListDB', {useNewUrlParser: true}, { useFindAndModify: false });

const items = [];

const itemSchema = {
    name: {
        type: String,
        required: true
    }
}

const Item = new mongoose.model("Item", itemSchema);

app.get("/", (req,res) => {
    
    Item.find({}, (err, todos) => {
        todos.forEach(todo => {
            console.log(todo);
        });

        res.render('index', {todoList: todos, date: formateDate()});
    })
})

app.post("/", (req,res) => {
    const name = req.body.todo;
    
    const newTodo = new Item({
        name: name
    })

    newTodo.save();

    res.redirect("/");
})

app.post("/delete", (req,res) => {
    const deleteItem = req.body.checked;

    Item.deleteOne({name: deleteItem}, err => {
        if(!err){
            console.log('deleted succesfully')
        }

        res.redirect("/");
    })
} )

const PORT = 3000 || process.env.PORT;

app.listen(PORT, (req,res) => {
    console.log('app running on port ' + PORT);
})