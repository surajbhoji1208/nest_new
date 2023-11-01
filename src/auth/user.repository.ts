import { EntityRepository, FindOneOptions, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auto-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User>
{
    async singUp( authCredentialDto:AuthCredentialDto):Promise<void>
    {
        const {username,password}=authCredentialDto
        const user=new User()
        user.username=username
        user.salt=await bcrypt.genSalt()
        user.password=await this.hashPassword(password, user.salt)
        
        try
        {
            await user.save()
        }catch(error)
        {
            if(error.code==="23505")//duplicate user name
            {throw new ConflictException("alredy exist")}
            else{throw new InternalServerErrorException()}
        }
    }

    private async hashPassword(password:string, salt:string):Promise<string>
    {
        return bcrypt.hash(password,salt)
    }

    async validateUserPassword(authCredentialDto:AuthCredentialDto):Promise<string>
    {   console.log("validate password",authCredentialDto);
    
        const {username,password}=authCredentialDto
        const user = await this.findOne({ username } as FindOneOptions<User>);

        if(user && await user.validatePassword(password))
        {
            return user.username;
        }
        else
        {
            return null;
        }
    }
}


