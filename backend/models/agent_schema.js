const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AgentSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    },

    firstname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userSchema',
      select: 'firstname',
      required: true
    },
    Lastname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userSchema',
      select: 'Lastname',
      required: true
    },

    userpassword: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userSchema',
      select: 'userpassword',
      required: true
    },
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userSchema',
      select: 'email',
      required: true

    },
      rating:
      {
        type:Number,
        enum:[1,2,3,4,5]
      },
      available: {
        type: Boolean,
        default: true
      },
      
      mfa: {
        enabled: { type: Boolean, default: false },
        secret: { type: String }
    },
     
      major:{
        enum:['Software','Hardware','Network'],
        type:Number
      }
})

const SupportAgent = mongoose.model('SupportAgent', AgentSchema);
module.exports = SupportAgent;