// CRUD create, read, update, delete
// validation-> mangoose


// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient
// const ObjectID=mongodb.ObjectID


const {MongoClient,ObjectID}=require('mongodb')


const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'


const id=new ObjectID()

console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{ // function, not const 

    if(error){
     return console.log('Unable to connect') 

    }

    // console.log('Connected :)')

    const db=client.db(databaseName)

    // db.collection('users').deleteMany({
    //     name:'Vikram'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('users').deleteOne({
        description:'Clean house'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

})

//   const updatepromise=  db.collection('users').updateOne({
//         _id:new ObjectID("60057841f20429173cf2390a")        
//     },{
//         // $inc:{
//         //     age:1 // also -1 for decrease
//         // }
//         $set:{
//             age:27
//         }
//     })

//     updatepromise.then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })

// const updatepromise=db.collection('users').updateMany({
//     name:'Aditya Rana'
// },{
//     $set:{
//         age:25
//     }
// })

//     updatepromise.then((result)=>{
//         console.log(result.modifiedCount)
//     }).catch((error)=>{
//         console.log(error)
//     })

// })




// db.collection('users').findOne({_id: new ObjectID("60057b74d9f5231c585e69c6")},(error,user  )=>{ //use objectif

//     if(error){
//         return console.log('Error reported!')
//     }

//     // console.log(user)

// })

// db.collection('users').find({completed:true}).toArray((error,users)=>{
//     console.log(users)
// })
 // db.collection('users').insertOne({ // Asynchronous call
    //     _id:id,
    //     name:'Vikram',
    //     age:'23'
    // },(error,result)=>{

    //     if(error){
    //         return console.log('Error resulted')
    //     }

    //     // console.log(result.ops)

    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'Shaina',
    //         age:21
    //     },{
    //         name:'Sameer',
    //         age:23
    //     }
    // ],(error,result)=>{

    //     if(error){
    //         return console.log('Unable to access')
    //     }

    //     console.log(result.ops)

    // })  

    // db.collection('users').insertMany([
    //     {
    //         description:'Clean house',
    //         completed:true
    //     },{
    //         description:'Get groceries',
    //         completed:false
    //     },{
    //         description:'Take dog for the walk',
    //         completed:true
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('Error while handling')
    //     }

    //     console.log(result.ops)
    // })


