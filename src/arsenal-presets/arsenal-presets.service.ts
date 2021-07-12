import { Injectable } from '@nestjs/common';
import { PostgrestError } from '@supabase/postgrest-js';

import { SupabaseService } from '../supabase/supabase.service.js';
import { definitions } from '../types/supabase.js';

@Injectable()
export class ArsenalPresetsService {
  constructor(private supabaseService: SupabaseService) {}

  async get(): Promise<[definitions['arsenal_presets'][], PostgrestError]> {
    const { data, error } = await this.supabaseService.client
      .from<definitions['arsenal_presets']>('arsenal_presets')
      .select('*');

    return [data, error];
  }
}
