const { default: mongoose } = require("mongoose");
const User = require('./models/userSchema');
const kw = require('./models/KnowldgeBase');


mongoose.connect('mongodb://127.0.0.1:27017/newtest1').then(async (res)=>{
    console.log(
        "DB Connected"
    )
    try{
        const user = await User.create({
            firstname: 'amr',
            Lastname: 'tarek',
            userid: 3,
            userpassword: 123,
            role: 'admin',
            email: 'amr.tarek@guc.com'
             
         })
         console.log('UserCreated',user);
    }catch(e){
        console.log('Error',e);
    }

}).catch((err)=>{
    console.log(
        "Error", err
    )
})

console.log(
    "Connecting to the db"
)