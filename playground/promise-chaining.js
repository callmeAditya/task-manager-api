require('../src/db/mongoose')

// const { findByIdAndUpdate } = require('../src/models/user')
// const User=require('../src/models/user')

// User.findByIdAndUpdate('60066aca778ce63750fa6d76',
// {age:1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((res)=>{
//     console.log(res)
// }).catch((e)=>{
//     console.log(e)
// })


// const updateageandcount= async(id,age)=>{

//     const user = await User.findByIdAndUpdate(id,{age})
//     const count = await User.countDocuments({age})
//     return count
// }

// updateageandcount('60066aca778ce63750fa6d76',25). then((res)=>{
//     console.log(res)
// }).catch((e)=>{
//     console.log(e)
// })



const Task=require('../src/models/task')

// Task.findByIdAndRemove('60070439fb30153f10815ff9').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((res)=>{
//     console.log(res)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteandcount= async (id, completed)=>{

const task= await Task.findByIdAndDelete(id)
const count = await Task.countDocuments({completed})
return count

}

deleteandcount('60082c2ff0fb4b052ce4712f',false).then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})