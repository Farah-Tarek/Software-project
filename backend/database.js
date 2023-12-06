const { default: mongoose } = require("mongoose");
const User = require('./models/userSchema');
const SupportAgent = require('./models/agent_schema');
const Ticket = require('./models/tickets'); // Assuming the path is correct based on your project structure

mongoose.connect('mongodb://127.0.0.1:27017/newtest1').then(async (res)=>{
    console.log(
        "DB Connected"
    )
    // try {
  
        // const newTicket = await Ticket.create({
            
                // Ticketid: 1,
                // user: "656ef623ac6ecea2a1158bfa",
                // issueType: "Software",
                // issue: "This is a sample issue",
                // status: "created",
                // resolution: "Sample resolution",
                // assigned_to_Agent: false,
                // createdTime: "2023-12-05T12:00:00Z",
                // updatedTime: "2023-12-05T13:00:00Z",
                // closeTime: "2023-12-05T14:00:00Z",
                // rating: 4,
                // routing: "Sample routing",
                // priority: "high"
              
              
        //   });
          
  
        // console.log('ticket created',newTicket);
    //   } catch (err) {
        // console.log("Error", err);
    //   }
    
}).catch((err)=>{
    console.log(
        "Error", err
    )
})

console.log(
    "Connecting to the db"
)