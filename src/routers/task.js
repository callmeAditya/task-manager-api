const express = require('express')
const router = new express.Router()
const auth=require('../middleware/auth')
const Task = require('../models/task')

// post user
router.post('/tasks',auth,async (req,res)=>{
    
    // res.send('testing!')
        // const task=new Task(req.body)

    const task=new Task({
        ...req.body,
        owner:req.user._id
    })

    try{

        task.save()
        res.status(201).send(task)

    }catch(e){
        res.status(404).send()
    }

    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})


//GET /tasks?completed=true or false
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt_asc or _desc
router.get('/tasks',auth,async (req,res)=>{

    const match ={}
    const sort= {}

    if(req.query.completed){
        match.completed = req.query.completed==='true'  //(returns string not boolean)
    }

    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }

    try{
        // const task= await Task.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            
            match,

            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }

        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',auth, async(req,res)=>{

    const updates =Object.keys(req.body)
const allowedupdates= ['description','completed']

const isvalidoperation= updates.every((update)=>{
    return allowedupdates.includes(update)
})

if(!isvalidoperation){
    return res.status(404).send({error:'Invalid op'})
}

try{
        const task= await Task.findOne({_id:req.params.id, owner:req.user._id})
        // const tasks= await Task.findByIdAndUpdate(req.params.id, req.body,{
        //     new:true,
        //     runValidators:true
        // })       
        
if(!task){
    return res.status(404).send()
}

updates.forEach((update)=> task[update]=req.body[update])
await task.save()

res.status(200).send(task)


}catch(e){
    
    res.status(500).send(e)
}

})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id

    try{
        // const task= await Task.findById(_id)
        const task= await Task.findOne({_id,owner:req.user._id})
        if(!task){
            res.send(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)

    }  
    //callback
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //                     return res.status(404).send()
    //                 }
    //                 res.send(task)
    //             }).catch((e)=>{
    //                 res.status(500).send()
    //             })    

    //             console.log(req.params)
})


router.delete('/tasks/:id',auth,async (req,res)=>{
    try{
        // const task= await Task.findByIdAndDelete(req.params.id)
        const task= await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})

        if(!task){
            res.status(404).send()
        }

        res.send(task)
    }catch(e){

    }
})

module.exports= router