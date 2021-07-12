import { Server } from '@logux/server';
import { SupabaseClient } from '@supabase/supabase-js';

import { ArsenalPresetsService } from '../arsenal-presets/arsenal-presets.service.js';

export async function main({
  arsenalPresetsService,
}: {
  supabase: SupabaseClient;
  arsenalPresetsService: ArsenalPresetsService;
}) {
  const server = new Server(
    Server.loadOptions(process, {
      subprotocol: '1.0.0',
      supports: '1.x',
      fileUrl: import.meta.url,
    }),
  );

  server.auth(({ userId, token }) => {
    // Allow only local users until we will have a proper authentication
    return process.env.NODE_ENV === 'development';
  });

  server.channel('presets/arsenal', {
    access(ctx) {
      return true;
    },
    async load(ctx) {
      const [data, error] = await arsenalPresetsService.get();
      if (error) {
        return { type: 'error/presets-arsenal', error };
      }

      return { type: 'presets/arsenal/items', items: data };
    },
  });

  return server.listen();
}
