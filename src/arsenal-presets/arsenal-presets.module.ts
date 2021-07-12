import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SupabaseService } from '../supabase/supabase.service.js';
import { ArsenalPresetsController } from './arsenal-presets.controller.js';
import { ArsenalPresetsService } from './arsenal-presets.service.js';

@Module({
  controllers: [ArsenalPresetsController],
  providers: [ArsenalPresetsService, SupabaseService, ConfigService],
})
export class ArsenalPresetsModule {}
