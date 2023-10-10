import { defineConfig } from 'cypress';
// import path from "path";
// import _ from "lodash";
// import axios from "axios";
// import dotenv from "dotenv";
// import Promise from "bluebird";
// import { percyHealthCheck } from "@percy/cypress/task";
import codeCoverageTask from '@cypress/code-coverage/task';
// import "@cypress/instrument-cra";
// const { devServer } = require("@cypress/react/plugins/react-scripts");
// import { devServer } from 'react-scripts';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  // component: {
  //   devServer: {
  //     framework: 'create-react-app',
  //     bundler: 'webpack',
  //   },
  // },

  component: {
    // devServer,
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
