import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { JwtPayload } from "./jwt-payload-interface";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topsecrete51'
        });
    }

    async validate(payload: JwtPayload):Promise<User> {
        
        const { username } = payload;
        const user = await await this.userRepository.findOne({ username } as FindOneOptions<User>);
        

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;

    }
}
