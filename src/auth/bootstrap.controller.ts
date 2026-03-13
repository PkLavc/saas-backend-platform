import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
import { SetupSystemDto } from './dto/setup-system.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class BootstrapController {
  constructor(private bootstrapService: BootstrapService) {}

  @Public()
  @Post('setup')
  @HttpCode(HttpStatus.CREATED)
  async setupSystem(@Body() setupDto: SetupSystemDto) {
    return this.bootstrapService.setupSystem(setupDto);
  }
}
