import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auto-credential.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>
{
    async singUp( authCredentialDto:AuthCredentialDto):Promise<void>
    {
        const {userName,password}=authCredentialDto
        const user=new User()
        user.username=userName
        user.password=password

        await user.save()
    }
}


