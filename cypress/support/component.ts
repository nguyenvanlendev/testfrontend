// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';
import { convertStringToArrayText } from '../../src/utils';
// import UserOnlineStatus from '../../src/components/UserOnlineStatus';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

// Cypress.Commands.add('switchUserByXstate', username => {
//   // cy.logoutByXstate();
//   // return cy.loginByXstate(username).then(() => {
//   //   if (isMobile()) {
//   //     cy.getBySel("sidenav-toggle").click();
//   //     cy.getBySel("sidenav-username").contains(username);
//   //     cy.getBySel("sidenav-toggle").click({ force: true });
//   //   } else {
//   //     cy.getBySel("sidenav-username").contains(username);
//   //   }
//   //   cy.getBySel("list-skeleton").should("not.exist");
//   //   cy.getBySelLike("transaction-item").should("have.length.greaterThan", 1);
//   // });
//   console.log('=======',convertStringToArrayText(''));
// });

// Example use:
// cy.mount(<MyComponent />);

//

// cy.mount();
