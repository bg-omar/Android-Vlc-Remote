import { registerPlugin } from '@capacitor/core';

import type { getJsonPlugin } from './definitions';

const getJson = registerPlugin<getJsonPlugin>('getJson', {
  web: () => import('./web').then(m => new m.getJsonWeb()),
});

export * from './definitions';
export { getJson };
