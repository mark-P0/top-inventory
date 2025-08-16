import { env } from './src/core/env';
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: {
    path: env.OPENAPI_PATH,
    watch: true
  },
  output: './src/core/api/codegen',
});