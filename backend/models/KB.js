const mongoose = require("mongoose");
const Schema = mongoose.Schema


    const KnowledgeSchema = new Schema({
    title: { type: String, 
        required: true },   
    CategoryType: {
        type: String,
        enum: ['Software', 'Hardware', 'Network'],
        required: true
        },
  Questions: { type: String, 
                required: true },
     Solutions: { type: String,
         required: true },
          
    })
    const KnowledgeBase = mongoose.model('knowledgebases', KnowledgeSchema);
    module.exports = KnowledgeBase;