import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@acontplus/core': fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url)),
      '@acontplus/ng-auth': fileURLToPath(
        new URL('./packages/ng-auth/src/index.ts', import.meta.url),
      ),
      '@acontplus/ng-common': fileURLToPath(
        new URL('./packages/ng-common/src/index.ts', import.meta.url),
      ),
      '@acontplus/ng-components': fileURLToPath(
        new URL('./packages/ng-components/src/index.ts', import.meta.url),
      ),
      '@acontplus/ng-config': fileURLToPath(
        new URL('./packages/ng-config/src/index.ts', import.meta.url),
      ),
      '@acontplus/ng-customer': fileURLToPath(
        new URL('./packages/ng-customer/src/index.ts', import.meta.url),
      ),
      '@acontplus/ng-infrastructure': fileURLToPath(
        new URL('./packages/ng-infrastructure/src/index.ts', import.meta.url),
      ),
      '@acontplus/ng-notifications': fileURLToPath(
        new URL('./packages/ng-notifications/src/index.ts', import.meta.url),
      ),
      '@acontplus/ui-kit': fileURLToPath(
        new URL('./packages/ui-kit/src/index.ts', import.meta.url),
      ),
      '@acontplus/utils': fileURLToPath(new URL('./packages/utils/src/index.ts', import.meta.url)),
    },
  },
  test: {
    passWithNoTests: true,
  },
});
