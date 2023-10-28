import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auto-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>
{
    async singUp( authCredentialDto:AuthCredentialDto):Promise<void>
    {
        const {userName,password}=authCredentialDto
        const user=new User()
        user.username=userName
        user.password=password

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
}


