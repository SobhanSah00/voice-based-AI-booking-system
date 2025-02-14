import mongoose,{Schema} from "mongoose";

const CallDataSchema = new Schema({
    callerId: { 
        type: String,
         required: true
    },  // call karne bale ka number 
    name: {
         type: String 
    },
    phone: {
         type: String 
    },
    service: {
         type: String 
    },
    date: {
         type: String 
    },
    conversation: [
        {
             type: String 
        }   
    ],  
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

const CallData = mongoose.model("CallData", CallDataSchema);

export default CallData;