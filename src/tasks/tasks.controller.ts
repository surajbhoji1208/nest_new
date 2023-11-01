import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto):Promise<Task[]> {
    return this.tasksService.getTasks(filterDto)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTasks(@Body() createTaskDto: CreateTaskDto): Promise<Task> {    
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id',ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id',ParseIntPipe) id: number): Promise<void> {
   return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: number,
    @Body('status',TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, status);
  }
}
