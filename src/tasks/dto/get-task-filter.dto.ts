import { IsIn, IsNotEmpty, IsOptional, isIn } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTaskFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.OPEN])
    status:TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search:string

}