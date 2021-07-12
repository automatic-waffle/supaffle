import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import { ArsenalPresetsService } from './arsenal-presets/arsenal-presets.service.js';
import { main as loguxServer } from './logux-server/server.js';
import { SupabaseService } from './supabase/supabase.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const supabase = app.get(SupabaseService).client;
  const arsenalPresetsService = app.get(ArsenalPresetsService);

  await app
    .listen(3000)
    .then(() => loguxServer({ supabase, arsenalPresetsService }));
}
bootstrap();
