/// <reference types="node" />
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Usa la variable de entorno CYPRESS_BASE_URL o el valor por defecto
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    viewportWidth: 1280,
    viewportHeight: 800,
  },
})
