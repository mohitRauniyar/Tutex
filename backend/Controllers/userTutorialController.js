import Assignment from "../models/assignment.model.js"
import Course from "../models/course.model.js"
import Progress from "../models/progress.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";
import { processingSpecificTutorialOfUser } from "../Service/ProcessTutorialOfUser.js";


export const getUserRegisteredTutorials = async(req,res)=>{

    try{
        const userAssignmentsResponses = await Assignment.findAll({
            where:{
                profileId:req.user
            },
            include:Course
        });
        let userAssignments = getDataFromSequelizeResponse(userAssignmentsResponses);
        let data = userAssignments.map((userAssignment)=>{
            const {assignmentId,status,Course} = userAssignment;
            const {courseId,title,photoUrl,slug} = Course;
            return {assignmentId,status,courseId,title,photoUrl,slug};
        })
        return res.status(200).json({message:"User assigned courses retrieved successfully",body:data});
    }catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    }  
}





export const getSpecificTutorialOfUser = async(req,res)=>{
        const id = req.params.assignmentId;
        return processingSpecificTutorialOfUser(res,id,false);
}



export const completeSpecificPartOfLesson = async(req,res)=>{
    const {assignmentId,lessonId,moduleName} = req.query;
    if(assignmentId === undefined || lessonId === undefined || moduleName === undefined){
        return res.status(400).json({message:"Bad request"});
    }

    let index;
    if(moduleName === "walkthrough") index = 0;
    else if(moduleName === "practice") index = 1;
    else if(moduleName === "assessment") index = 2;
    else{
        return res.status(404).json({message:"Not Found"});
    }

    try{
        const progressResponse = await Progress.findOne({
            attributes:['progressId','progress'],
            where:{
                assignmentId:assignmentId,
                lessonId:lessonId
            },
        });
        if(!progressResponse){
            return res.status(404).json({message:"Module not found"});
        }
        let userProgress = getDataFromSequelizeResponse(progressResponse);

        let newProgress = userProgress.progress.substring(0,index)+'1'+userProgress.progress.substring(index+1);


        await Progress.update({
            progress:newProgress
        },{
            where:{
                progressId:userProgress.progressId
            }
        });

        return processingSpecificTutorialOfUser(res,assignmentId,true);
    }catch(err){
        console.log(err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }

}