import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/task.entity";

export const typeOrmConfig:TypeOrmModuleOptions={
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'postgres',
    database:'taskmanagement',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true
    


}