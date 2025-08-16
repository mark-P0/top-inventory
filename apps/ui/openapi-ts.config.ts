import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: {
    path: 'http://localhost:8000/openapi.json',
    watch: true
  },
  output: './src/core/api/codegen',
});