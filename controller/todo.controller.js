const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../models");
const Todo = db.todos;


//Create Todo item
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

//Update Todo item
exports.update = async (req, res) => {

    const id = req.params.id;

    try {
        Todo.update(req.body, {
            where: { id: id }
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while update the todo."
                });
            });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

//Update Todo item
exports.delete = async (req, res) => {

    const id = req.params.id;

    try {
        Todo.destroy({ where: { id: id } })
            .then(data => {
                res.send({ message: "Todo was deleted successfully!" });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while deleting the todo."
                });
            });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}



//Get todo list for user
exports.getAllTodosByUser = async (req, res) => {

    const id = req.params.id;

    console.log(req.params, 'req.params');

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
                    err.message || "Some error occurred while retrieving todo list."
            });
        });

}

