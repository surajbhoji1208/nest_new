import { Injectable, NotFoundException } from '@nestjs/common';


import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private TaskRepository:TaskRepository){}

       async getTasks(filterDto:GetTaskFilterDto):Promise<Task[]>
        {
         return  await this.TaskRepository.getTask(filterDto)
        }

   

   async createTask(createTaskDto):Promise<Task>{
        const {title,description}=createTaskDto
        const task=new Task
        task.title=title
        task.description=description
        task.status=TaskStatus.DONE
       await task.save() 
       return task       
    }
    // createTask(createTaskDto):Task
    // {        
    //     const {title,description}=createTaskDto
    //     const task:Task={
    //         id:uuidv4(),
    //         title,
    //         description,
    //         status:TaskStatus.OPEN

    //     }
    //     this.task.push(task)
    //     return task
    // }

  async  deleteTaskById(id:number):Promise<void>{
        const result=await this.TaskRepository.delete(id)
        if(result.affected===0)
        {
            throw new NotFoundException("nahi mila")

        }
        
        
    }
    // deleteTaskById(id:string):void{
    //     const found=this.getTaskById(id)
    //     this.task=this.task.filter(task=>task.id!=found.id)
    // }

    async updateTaskById(id:number,status:TaskStatus):Promise<Task>
    {
        const task= await this.getTaskById(id)
        task.status=status
        await task.save()
        return task
    }
    // updateTaskById(id:string,status:TaskStatus):Task{
    //     const task=this.getTaskById(id)
    //     console.log(task);

    //     task.status=status
        
    //     return task

    // }
    // getAllTaskByFilter(filterDto:GetTaskFilterDto):Task[]
    // { const {status, search}=filterDto
    // let task=this.getAllTasks()
    // if(status){
    //     task=task.filter(task=>task.status==status)}
    //     if(search)
    //     {
    //         task=task.filter(task=>
    //             task.title.includes(search) || task.description.includes(search)
    //         )
    //     }
    //     return task
    // }

    async getTaskById(id:number):Promise<Task>{
        const found=await this.TaskRepository.findOne(id)
        if(!found)
        {
            throw new NotFoundException("nahi mila")

        }
        return found
    }
   
}
