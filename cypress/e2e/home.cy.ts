import { mount } from 'cypress/react';
// import { getCookieTokenChatTool } from 'src/utils';
// import { getCookieTokenChatTool } from '/ /utils';

describe('GENERAL', () => {
  // it('Testing ', () => {
  //   // getCookieTokenChatTool();
  //   cy.exec('getCookieTokenChatTool');
  // });

  it('Testing UI nhap lieu', () => {
    cy.viewport('macbook-11');
    cy.visit('http://localhost:3000');

    // TINH CACH
    cy.get(':nth-child(3) > .dropdown-tick > .dropdown-tick__header > .dropdown-tick__show > span').click();
    cy.wait(500);
    cy.get('.dropdown-tick__body > :nth-child(1)').click({ force: true });

    // NGHE NGHIEP
    cy.get(':nth-child(5) > .dropdown-tick__header > .dropdown-tick__show > span').click();
    cy.wait(500);
    cy.get('.dropdown-tick__body > :nth-child(1)').click({ force: true });
    cy.wait(1000);

    cy.get(':nth-child(7) > .dropdown-tick__header > .dropdown-tick__show > span').click();
    cy.get('.dropdown-tick__body > :nth-child(1)').click({ force: true });

    cy.get(':nth-child(9) > input').type('Nguyẽn Thành Nam');
    cy.get(':nth-child(10) > input').type('0900000002');
    cy.get(':nth-child(11) > input').type('a@gmail.com');

    cy.get(':nth-child(14) > .dropdown-tick__header > .dropdown-tick__show > span').click();
    cy.get('.dropdown-tick__body > :nth-child(1)').click({ force: true });

    cy.get(':nth-child(16) > :nth-child(1) > .dropdown-tick__header > .dropdown-tick__show > span').click();
    cy.get('.dropdown-tick__body > :nth-child(1)').click({ force: true });

    cy.get(':nth-child(2) > .dropdown-tick__header > .dropdown-tick__show > span').click();
    cy.get('.dropdown-tick__body > :nth-child(1)').click({ force: true });

    cy.get('.header-search-action').click();
  });
});
