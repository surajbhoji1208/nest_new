import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { type } from "os";
import { Task } from "src/tasks/task.entity";
@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    password:string

    @Column()
    salt:string


    /*whenever we retrive user as a object eager entity is set to true
    when eager is set to true we can access user.task imediatly and array of tasks by the same user 
    one side of relationship to be eager not both of them 
    */
    @OneToMany(type => Task, task=>task.user, {eager:true})
    tasks: Task[]
    async validatePassword(password:string):Promise<boolean>
    {
        const hash = await bcrypt.hash(password,this.salt)
        return hash === this.password
    }

}