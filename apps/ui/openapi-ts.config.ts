import { env } from './src/core/env';
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: {
    path: env.API_OPENAPI_SPEC_URL,
    watch: true
  },
  output: './src/core/api/codegen',
});