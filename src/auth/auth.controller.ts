import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auto-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService)
    {

    }
    @Post('/signup')
    signUp(@Body() authCredentialDto:AuthCredentialDto):Promise<void>
    {        
        return this.authService.signUp(authCredentialDto)        
    }
}
