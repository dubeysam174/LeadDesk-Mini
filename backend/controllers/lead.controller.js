import {
  createLead,
  getAllLeads,
  updateLeadStatus,
} from "../models/lead.model.js";

export const addLead = async (req, res) => {
  try {
    const { name, email, budget, message } = req.body;

    if (!name || !email || !budget || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await createLead(req.body);

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });
  }
};

// for getting all leads
export const fetchLeads = async (req, res) => {
  try {

    const leads = await getAllLeads();

    return res.status(200).json({
      success: true,
      leads,
    });

  } catch (error) {

    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });
  }
};

// for updating status...
export const changeLeadStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const { id } = req.params;

    await updateLeadStatus(id, status);

    return res.status(200).json({
      success:true,
      message:"Status Updated"
    });

  } catch (error) {

    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });
  }
};