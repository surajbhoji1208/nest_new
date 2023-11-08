import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auto-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService)
    {

    }
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<void>
    {        
        return this.authService.signUp(authCredentialDto)        
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<{accessToken:string}>
    {   console.log("controller",authCredentialDto);
    
        return this.authService.signIn(authCredentialDto);
    }
}
