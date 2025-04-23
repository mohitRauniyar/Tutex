import Assignment from "../models/assignment.model.js"
import Course from "../models/course.model.js"
import Lesson from "../models/lesson.model.js";
import Progress from "../models/progress.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";
import { getProgressValue } from "../utils/progressConverter.js";

export const processingSpecificTutorialOfUser = async(res,id,isUpdate)=>{
    try{

        const assignmentRes = await Assignment.findByPk(id,{
            include:Course
        });
        if(!assignmentRes){
            return res.status(404).json({message:"Assignment not found"});
        }
        let userAssignment = getDataFromSequelizeResponse(assignmentRes);

        let progressResponse = await Progress.findAll({
            where:{
                assignmentId:id
            },
            include:Lesson
        })

        let userProgresses = getDataFromSequelizeResponse(progressResponse);

        let {assignmentId,courseId,status} = userAssignment;
        const {photoUrl,title} = userAssignment.Course;

        let lessons = []
        let size = userProgresses.length
        for(const userProgress of userProgresses){
            let {lessonId,title,description} = userProgress.Lesson;
            description = Buffer.from(description);
            description = description.toString('utf8');
            const progress = getProgressValue(userProgress.progress);
            lessons.push({lessonId,title,description,progress});
            if(progress === '111')size--;
        }

        if(size === 0 && status === "pending"){
            await Assignment.update({
                status:"completed"
            },{
                where:{
                    assignmentId:assignmentId
                }
            })
            status="completed"
        }
        const data = {
            assignmentId,
            courseId,
            title,
            photoUrl,
            status,
            lessons
        }
        return res.status(200).json({message:isUpdate?"Assignment submitted Successfully":"Tutorial fetched Successfully",body:data});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}
