const express = require("express")
const router = new express.Router()
const Task = require("../../models/task")

const auth = require("../middleware/auth")




router.get("/tasks", auth, async (req, res) => {
    try{
        const tasks = await Task.find();

        const response = Array()
        
        for (let task of tasks){
            await task.populate("owner")

            if (task.owner.id == req.user.id) 
            {
                response.push(task)
            }               
                
        }

        res.status(200).send(response)
    }catch{
        res.status(500).send()
    }
})

router.get("/task/:id", auth, async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);

        await task.populate('owner')

        if (task.owner.id == req.user.id)
        {
            res.status(200).send(task)
        }else{
            res.status(404).send({error:"You are not an owner of the task"})
        }
    }catch{
        res.status(500).send()
    }
})

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner:req.user.id
    });
    try{
        await task.save();
        res.status(200).send(task);
    }catch(error){
        res.status(500).send(error.message);
    }
})

router.delete("/task/:id", auth, async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error("Task not found")
        }

        await task.populate('owner')
        if (task.owner.id == req.user.id)
        {
            await Task.deleteOne({_id:req.params.id})
            res.send(task);
        }else{
            throw new Error("You are not an owner of that task")
        }

    }catch(error) {
        res.status(404).send(error.message);
    }
})

router.patch('/task/:id', auth, async(req,res) =>{
    try{
        const task = await Task.findById(req.params.id)

        if (!task){
            throw new Error("Task not found")
        }

        await task.populate("owner")

        if (task.owner.id == req.user.id)
        {
            const fields = ["title", "description", "completed"]
            fields.forEach((field) =>{
                if (req.body[field])
                    task[field] = req.body[field]
            })
    
            await task.save()
    
            res.json(task)
        }else{
            throw new Error("You are not an owner of the task")
        }

    }catch(error){
        res.status(404).send(error.message)
    }
})

module.exports = router;