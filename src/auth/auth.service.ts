import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auto-credential.dto';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository)
    {  }

    async signUp(authCredentialDto:AuthCredentialDto):Promise<void>
    {
        return this.userRepository.singUp(authCredentialDto)
    }
}
