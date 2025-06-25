import { UserConfigFn } from 'vite';
import { overrideVaadinConfig } from './vite.generated';

const customConfig: UserConfigFn = (env) => ({
  // Here you can add custom Vite parameters
  // https://vitejs.dev/config/
  server: {
    warmup: {
      clientFiles: ['src/main/frontend/views/*.tsx'],
    }
  }
});

export default overrideVaadinConfig(customConfig);
