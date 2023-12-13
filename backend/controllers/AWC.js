const issuesModel = require("../sub_issues.js");
const workflowModel = require("../workflowSchema.js");
require("../models/tickets.js");
const AWController = {
    GetSolution: async (req, res) => {
        const issues = req.body;
        const workflow = req.body;
        
        try {
        if(issues == 'hardware')
        {const hardwareIssues = await issuesModel.find({ issueType: 'hardware' }, 'hardware');
        console.log("Hardware Issues:", hardwareIssues);
          if(workflow == 'Desktops')
            {
                const DesktopsSol = await workflowModel.find({ issueSol: 'Desktops' }, 'Desktops');
                return res.status(200).json(DesktopsSol);
            }

            if(workflow == 'Laptops')
            {
                const LaptopsSol = await workflowModel.find({ issueSol: 'Laptops' }, 'Laptops');
                return res.status(200).json(LaptopsSol);
            }

            if(workflow == 'Printers')
            {
                const PrintersSol = await workflowModel.find({ issueSol: 'Printers' }, 'Printers');
                return res.status(200).json(PrintersSol);
            }

            if(workflow == 'Servers')
            {
                const ServersSol = await workflowModel.find({ issueSol: 'Servers' }, 'Servers');
                return res.status(200).json(ServersSol);
            }

            if(workflow == 'Networking equipment')
            {
                const Networking_equipmentSol = await workflowModel.find({ issueSol: 'Networking equipment' }, 'Networking equipment');
                return res.status(200).json(Networking_equipmentSol);
            }
        }
        if(issues == 'software')
        {const softwareIssues = await issuesModel.find({ issueType: 'software' }, 'software');
        console.log("Software Issues:", softwareIssues);

        if(workflow == 'Operating system')
            {
                const Operating_systemSol = await workflowModel.find({ issueSol: 'Operating system' }, 'Operating system');
                return res.status(200).json(Operating_systemSol);
            }

             if(workflow == 'Application software')
            {
                const Application_softwareSol = await workflowModel.find({ issueSol: 'Application software' }, 'Application software');
                return res.status(200).json(Application_softwareSol);
            }

            if(workflow == 'Custom software')
            {
                const Custom_softwareSol = await workflowModel.find({ issueSol: 'Custom software' }, 'Custom software');
                return res.status(200).json(Custom_softwareSol);
            }

            if(workflow == 'Integration issues')
            {
                const Integration_issuesSol = await workflowModel.find({ issueSol: 'Integration issues' }, 'Integration issues');
                return res.status(200).json(Integration_issuesSol);
            }
        }
        if(issues == 'network')
        {const networkIssues = await issuesModel.find({ issueType: 'network' }, 'network');
        console.log("Network Issues:", networkIssues);
        
        if(workflow == 'Email issues')
        {
            const Email_issuesSol = await workflowModel.find({ issueSol: 'Email issues' }, 'Email issues');
            return res.status(200).json(Email_issuesSol);
        }

        if(workflow == 'Internet connection problems')
        {
            const Internet_connection_problemsSol = await workflowModel.find({ issueSol: 'Internet connection problems' }, 'Internet connection problems');
            return res.status(200).json(Internet_connection_problemsSol);
        }

        if(workflow == 'Website errors')
        {
            const Website_errorsSol = await workflowModel.find({ issueSol: 'Website errors' }, 'Website errors');
            return res.status(200).json(Website_errorsSol);
        }
    
    }

      } catch (error) {
          return res.status(500).json({ message: error.message });
      }
  }
  };
    
  module.exports = AWController;