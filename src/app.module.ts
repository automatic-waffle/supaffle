import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ArsenalPresetsModule } from './arsenal-presets/arsenal-presets.module.js';
import { SupabaseService } from './supabase/supabase.service.js';
import configuration from './config/configuration.js';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ArsenalPresetsModule,
  ],
  controllers: [],
  providers: [SupabaseService],
})
export class AppModule {}
