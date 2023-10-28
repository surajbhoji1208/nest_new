import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus=[
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value:any,metadata:ArgumentMetadata)
    {   value=value.toUpperCase()
        if(!this.isStatusInvalid(value))
        {
            throw new BadRequestException("chukich hy ")
        }
        return value
       }

       private isStatusInvalid(status)
       {
        const idx=this.allowedStatus.indexOf(status)
        return idx!==-1
       }
}