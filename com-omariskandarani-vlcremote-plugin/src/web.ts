import { WebPlugin } from '@capacitor/core';

import type { getJsonPlugin } from './definitions';

export class getJsonWeb extends WebPlugin implements getJsonPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
