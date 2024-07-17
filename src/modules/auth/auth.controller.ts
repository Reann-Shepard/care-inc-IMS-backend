import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const { access_token, refresh_token } = await this.authService.signIn(
      signInDto.name,
      signInDto.password,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 5 * 24 * 60 * 1000, // 5 days
    });
    res.send({ access_token, refresh_token, message: 'Login successful' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Body('refresh_token') refreshToken: string,
    @Res() res: Response,
  ) {
    const newAccessToken =
      await this.authService.refreshAccessToken(refreshToken);
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });
    res.send({ access_token: newAccessToken, message: 'Token refreshed' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-token')
  async verifyToken(@Body('access_token') accessToken, @Res() res: Response) {
    await this.authService.verifyToken(accessToken);
    res.send({ message: 'Token is valid' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.send({ message: 'Logout successful' });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
