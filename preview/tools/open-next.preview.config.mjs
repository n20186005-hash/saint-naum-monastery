// @ts-check
import { defineCloudflareConfig } from '@opennextjs/cloudflare/config';
export default defineCloudflareConfig({
  incrementalCache: 'dummy', tagCache: 'dummy', queue: 'dummy', cachePurge: 'dummy',
  enableCacheInterception: false, routePreloadingBehavior: 'none'
});
