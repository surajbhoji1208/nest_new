import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TaskService {
    private tasks:Task[]=[]

    getAllTasks(){
        return this.tasks
    }

    createTask(title:string,description:string)
    {
        const task:Task={
            title,
            description,
            status:TaskStatus.DONE
        }
    }
}
