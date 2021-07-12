import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import { ArsenalPresetsService } from './arsenal-presets/arsenal-presets.service.js';
import { main as loguxServer } from './logux-server/server.js';
import { SupabaseService } from './supabase/supabase.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist: string[] = app.get(ConfigService).get('corsWhitelist');
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  const supabase = app.get(SupabaseService).client;
  const arsenalPresetsService = app.get(ArsenalPresetsService);

  await app
    .listen(4000)
    .then(() => loguxServer({ supabase, arsenalPresetsService }));
}
bootstrap();
