import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    name: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.findOne(name);
    const isMatched = await bcrypt.compare(password, user?.password);
    if (!isMatched) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, name: user.name, roles: user.role };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      // expiresIn: '2h',
      expiresIn: '3m', // Access token expires in 3 minutes
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '5d',
      // expiresIn: '8h', // Refresh token expires in 8 hours
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = await this.jwtService.signAsync(
        {
          sub: payload.sub,
          name: payload.name,
          roles: payload.roles,
        },
        // { expiresIn: '15m' },
        { expiresIn: '3m' }, // Access token expires in 3 minutes
      );
      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyToken(token: string): Promise<void> {
    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
