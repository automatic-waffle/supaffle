import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

import { ArsenalPresetsService } from './arsenal-presets.service.js';

@Controller('arsenal-presets')
export class ArsenalPresetsController {
  constructor(private arsenalPresetsService: ArsenalPresetsService) {}

  @Get()
  async findAll() {
    const [data, error] = await this.arsenalPresetsService.get();
    if (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    return data;
  }
}
