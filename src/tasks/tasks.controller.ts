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
  UseGuards,
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
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(
    @Query(ValidationPipe)filterDto: GetTaskFilterDto,
    @GetUser() user:User
    ):Promise<Task[]> {
    return this.tasksService.getTasks(filterDto,user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTasks(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user:User
    ): Promise<Task> {    
    return this.tasksService.createTask(createTaskDto,user);
  }

  @Get('/:id')
  getTaskById(@Param('id',ParseIntPipe) id: number,
    @GetUser() user:User)
  : Promise<Task> {
    return this.tasksService.getTaskById(id,user);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id',ParseIntPipe) id: number,
      @GetUser() user:User
    ): Promise<void> {
   return this.tasksService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: number,
    @Body('status',TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user:User
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, status,user);
  }
}
