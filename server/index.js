const bodyParser = require('body-parser');
const express = require('express');
require('./dbConfig/dbConfig.js')
const Todos = require('./models/model.js');
const cors = require('cors')

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;

//middleWares 
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, World!"); // or render your homepage if applicable
});

app.get("/api/todos", async (req, res) => {
    try {

        const todos = await Todos.find();
        return res.send({
            // success : true,
            todos
        })

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
});

app.post('/api/todos', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newTodo = await Todos.create({
            name,
            description
        });

        return res.json({
            success: true,
            newTodo
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    const { name, description } = req.body;

    try {
        const updatedTodo = await Todos.findByIdAndUpdate(todoId, { name, description }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                err: "Todo not Found"
            })
        };

        return res.status(200).json({
            success: true,
            updatedTodo
        })

    } catch (error) {
        console.error("Error updating Todo at put route => ", error.message);
    }
})

app.delete('/api/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    try {
        const deletedTodo = await Todos.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found'
            });
        }
        return res.status(200).json({
            success: true,
            deletedTodo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
})


app.listen(port, () => {
    console.log(`Server Started  at port ${port}`);
});
