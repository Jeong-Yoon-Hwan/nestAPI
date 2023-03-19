import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //JWT추출방법, Authorization 헤더에 베어러 토큰을 제공하는 방식
      ignoreExpiration: false, //만료된 JWT가 제공되면 401 Unauthorized 응답 전송
      secretOrKey: jwtConstants.secret, // 시크릿키
    });
  }

  //디코딩된 JSON을 전달
  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}