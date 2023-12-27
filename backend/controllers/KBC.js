const KnowledgeBaseModel = require("../models/KB");
const KBController = {
  
    insertBase: async (req, res) => {
        const { BaseId, title, Questions, Solutions, CategoryType } = req.body;
        try {
            const newBase = new KnowledgeBaseModel({
                BaseId: BaseId,
                title: title,
                Questions: Questions, 
                Solutions: Solutions, 
                CategoryType: CategoryType
            });
    
            await newBase.save();
            res.status(201).json({ message: "Knowledge data added successfully", data: newBase });
        } catch (error) {
            // It's usually a good idea to log the actual error for debugging purposes
            console.error(error);
            // Include the error message in the response for the client to understand what went wrong
            return res.status(500).json({ message: "Invalid inserting KnowledgeBase", error: error.message });
        }
    }
    ,
  
  
    searchByCat: async (req, res) => {
    const category = req.params.CategoryType;
    try {
        const Base = await KnowledgeBaseModel.find({ CategoryType: category }, 'BaseId title Questions Solutions');
        return res.status(200).json(Base);
    } catch (error) {
        return res.status(500).json({ message: "could not search by Category!" });
    }
},

searchById: async (req, res) => {
    const baseid = req.params.BaseId;
    try {
        const Base = await KnowledgeBaseModel.findOne({ BaseId: baseid }, 'BaseId title Questions Solutions');
        return res.status(200).json(Base);
    } catch (error) {
        return res.status(500).json({ message: "could not search by id!" });
    }
},

getAll: async (req, res) => {
    try {
      const getAll = await KnowledgeBaseModel.find();
  
      if (getAll.length === 0) {
        res.status(500).json({ message: "Error getting data", error: error.message });
      }
  
      res.status(200).json(getAll);
    } catch (error) {
      res.status(500).json({ message: "Error getting data", error: error.message });
    }
  }
  ,

  deleteBase : async (req, res) => {
    try {
     
      const deleteKB = await KnowledgeBaseModel.findByIdAndDelete(req.params.id);

      if (!deleteKB) {
        console.log('No KnowledgeBase found'); 
        res.status(404).json({ message: 'KnowledgeBase not found with the provided ID' });
      }

      res.status(200).json({ message: 'KnowledgeBase is successfully deleted!' , deleteKB});

    } catch (error) {
      res.status(500).json({ message: 'Error deleting KnowledgeBase', error: error.message });
    }
  }
};


  
module.exports = KBController;
