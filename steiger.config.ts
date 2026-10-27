import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  // TanStack Start file routes and generated tree live in the app layer.
  { ignores: ['./src/app/routeTree.gen.ts'] },
])
