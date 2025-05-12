import Feedback from "../models/feedback.model.js";

export const createFeedback = async (req, res) => {
  const { rating, easeOfUse, helpfulFeature, recommend, comment, suggestion } = req.body;

  if(rating == undefined || easeOfUse == undefined || helpfulFeature === undefined || recommend === undefined || comment === undefined || suggestion === undefined){
    return res.status(400).json({message:"Bad request"});
  }
  const profileId = req.user;

  try {
    const newFeedback = await Feedback.create({
      profileId,
      rating,
      easeOfUse,
      helpfulFeature,
      recommend,
      comment,
      suggestion,
    });

    return res.status(201).json({ message: "Feedback created successfully", feedback: newFeedback });
  } catch (err) {
    console.error("Error creating feedback:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeedbackStatus = async (req,res)=>{
    try{
        const feedback = await Feedback.findOne({
            where:{
                profileId:req.user
            }
        });
        if(feedback){
            return res.status(200).json({message:"Feedback exists",body:true});
        }else{
            return res.status(404).json({message:"Feedback not found",body:false});
        }
    }catch(err){
        console.error("Error retrieving feedback:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}