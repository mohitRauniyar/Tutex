import { Op } from "sequelize";
import Assignment from "../models/assignment.model.js";
import Course from "../models/course.model.js"
import Lesson from "../models/lesson.model.js";
import Progress from "../models/progress.model.js";
import { getProgressValue } from "../utils/progressConverter.js";

const getCourseAndLessons = async(id)=>{
    let courseRes = await Course.findByPk(id,{
        include:Lesson
    });

    if(!courseRes) return courseRes;
    let course = courseRes.dataValues;
    let lessons = course.Lessons.map((lessonObj)=>{
        let lesson = lessonObj.dataValues
        let textDescription = lesson.description.toString('utf8');
        return {...lesson,description:textDescription};
    })
    course = {...course,Lessons:lessons}
    return course;
}



export const getAllCoursesList = async(req,res)=>{
    try{
        const courses = await Course.findAll();
        res.status(200).json({message:"Successfully retrieved courses",body:courses});
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const getCourseById = async(req,res)=>{
    try{
        const id = req.params.id;
        const course = await getCourseAndLessons(id);
        if(!course){
            return res.status(404).json({message:"Course doesn't exist",body:{}});
        }
        return res.status(200).json({message:"Course searched successful",body:course});
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Internal Server error"});
    }
}


export const startCourse = async(req,res)=>{
    try{
        const id = req.params.id;
        let course = await getCourseAndLessons(id);

        //finding course if it exists
        if(!course){
            return res.status(404).json({message:"Course doesn't exist",body:{}});
        }
        
        //creating the assignment or finding if it already exists
        const [assignmentRes,createdAssignment] = await Assignment.findOrCreate({
            where:{
                [Op.and]:[
                    {
                        profileId:req.user,
                    },
                    {
                        courseId:id
                    }
                ]
            },
            defaults:{
                profileId:req.user,
                courseId:id
            }
        });

        const assignment = await assignmentRes.dataValues;

        //Creating progress or finding it it already exists
        let progressResponses = await Promise.all(course.Lessons.map((lesson)=>{
            return Progress.findOrCreate({
                where:{
                    [Op.and]:[
                        {
                            lessonId:lesson.lessonId
                        },
                        {
                            assignmentId:assignment.assignmentId
                        }
                    ]
                },
                defaults:{
                    lessonId:lesson.lessonId,
                    assignmentId:assignment.assignmentId
                }
            })
        }));

        //getting actual data of progresses
        let progresses = progressResponses.map((progressResponse)=>{
            return progressResponse[0].dataValues;
        })


        let lessons = [];
        for(const lesson of course.Lessons){
            const {lessonId,title,description} = lesson;
            const progressForLesson = progresses.filter((progress)=>progress.lessonId === lessonId);

            const progress = getProgressValue(progressForLesson[0].progress);
            lessons.push({lessonId,title,description,progress});
        }

        const data = {
            assignmentId:assignment.assignmentId,
            courseId:course.courseId,
            title:course.title,
            status:assignment.status,
            lessons:lessons
        }
            
        return res.status(200).json({message:createdAssignment?"Assignment creation Successful":"Assignment retrieved",
            body:data
        });
        
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Internal Server error"});
    }
}

