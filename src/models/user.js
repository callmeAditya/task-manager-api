const mongoose= require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')
const Task=require('./task')
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
//   useNewUrlParser:true,
//   useCreateIndex:true,
//   useUnifiedTopology:true
    
// })
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot be-password')
            }
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],avatar:{
        type:Buffer
    }
},{
        timestamps:true
    

})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})




// const User= mongoose.model('User',{ // defining model
//     })

userSchema.methods.toJSON= function(){
    const user = this
    const userObject= user.toObject()

    delete userObject.password
    delete userObject.tokens

    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken= async function(){ // instaces

    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)

    user.tokens= user.tokens.concat({token})
    await user.save()

    return token

}


userSchema.statics.findByCredentials = async(email, password)=>{ // models

    const user = await User.findOne({email:email})
    if(!user){
        throw new Error("User not found!")
    }

    const ismatch = await bcrypt.compare(password,user.password)

    if(!ismatch){
        throw new  Error('Wrong password!') // keep login info as low as possible like unable to login
    }

    return user

}




//hash plain text password before saving
userSchema.pre('save', async function(next){
    const user = this

    // console.log('just before saving it')

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


//delete task when user is removed

userSchema.pre('remove',async function(next){
    const user= this

    await Task.deleteMany({owner:user._id})

    next()
})
const User = mongoose.model('User', userSchema)

module.exports=User