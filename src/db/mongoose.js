const mongoose= require('mongoose')
// const validator=require('validator')

mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false
    
})



// const me= new User({    // creating instance
//     name:'Bob Smith',
//     email:'BOB@gmail.com',
//     password:'Password123'
// })

// me.save().then(()=>{      // saving instance
//     console.log(me)
// }).catch((error)=>{
// console.log('Error',error)
// })

// const Task=mongoose.model('Task',{
  
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }   

// })
// const task=new Task(({
//     description:'Take dog for walk',
//     completed:true

// }))

// const task2 = new Task(({
//   description:'Get groceries',
//   completed: false
// }))

// // task.save().then(()=>{
// //     console.log(task)
// // }).catch((error)=>{
// //     console.log(error)
// // })

// task2.save().then(()=>{
//   console.log(task2)
// }).catch((e)=>{
//   console.log(e)
// })