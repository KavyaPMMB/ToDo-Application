const express=require('express');
const { createtodo, gettodo, deletetodo, UpdateTodo, getsingletask } = require('../controller/Todocrud');

const router=express.Router();
router.route("/createtask").post(createtodo)
router.route("/gettask").get(gettodo)
router.route("/deletetask/:id").delete(deletetodo)
router.route("/updatetask/:id").put(UpdateTodo)
router.route("/viewtask/:id").get(getsingletask)


module.exports=router;