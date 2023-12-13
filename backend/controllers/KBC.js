const KnowledgeBaseModel = require("../models/KB.js");
const KBController = {
  search: async (req, res) => {
    const category = req.params.CategoryType;
    try {
        const Base = await KnowledgeBaseModel.findOne({ CategoryType: category }, 'title Questions Solutions');
        return res.status(200).json(Base);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
};
  
module.exports = KBController;
 