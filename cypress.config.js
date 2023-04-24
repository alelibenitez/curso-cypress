const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000, //cypress va a demorar 10 seg en cargar y hacer las aserciones correspondientes
    watchForFileChanges:false,
    baseUrl: 'https://pushing-front.vercel.app/'
  },
});
