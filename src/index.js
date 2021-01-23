const express=require('express')
require('./db/mongoose.js') // connection to mongoDB


const User = require('./models/user.js')



const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app= express()
const port=process.env.PORT // see config


// app.use((req,res,next)=>{

//     if(req.method==='GET'){
//         res.send('GET requests are disabled!')
//     }else{
//         next()
//     }
//     // console.log(req.method, req.path)
//     // next()
// })

// app.use((req,res)=>{ //maintenance
//     res.status(503).send("Site currently down! Check again soon")
// })



const multer = require('multer')

const upload= multer({
    dest:'images',
    limits:{
        fileSize:1000000
        
    },
    fileFilter(req,file,cb){  // cb=callback

        if(!file.originalname.match(/\.(doc|docx)$/)){  //originalname.endswith()-second way
            cb(new Error('File must be docx/doc'))
        }
        
        cb(undefined,true)
        // cb(undefined,false)
    }
})


const errorMiddleware=(req,res,next)=>{
    throw new Error('From middleware')
}


app.post('/upload', upload.single('upload'),(req,res)=>{ // upload.single('upload') in place of errorMW
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// app.use(User)

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})