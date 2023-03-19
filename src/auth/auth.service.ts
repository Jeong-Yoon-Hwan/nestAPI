import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService { 
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ){}

  // 'username' && 'pw' 가 같은지 체크
  async validateUser(username: string, password: string):Promise<any>{
    const user = await this.userService.findOne(username);
    if(user && user.password === password){
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 토큰 payload에 로그인 정보를 담아서 반환
  async login(user: any){
    const payload = { username: user.username, sub: user._id};
    return {
      aceess_token: this.jwtService.sign(payload),
    }
  }


}
