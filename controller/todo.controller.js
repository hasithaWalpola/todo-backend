const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../models");
const Todo = db.todos;


//Create a Todo item
exports.create = async (req, res) => {

    const todo = {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        trasnlation: "",
    };

    try {
        Todo.create(todo)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the todo."
                });
            });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

//Get todo list for user
exports.getAllTodosByUser = async (req, res) => {

    const id = req.params.id;

    Todo.findAll({ where: { user_id: id } })
        .then(data => {
            res.send({
                code: 200,
                data: data,
                message: "todos"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

}

