import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret55',
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
