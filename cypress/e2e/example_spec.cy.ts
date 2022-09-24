/// <reference types="cypress" />

describe('AntiPattern Example - Hard coded wait', function () {
  it('should return 404 if id is not provided', async () => {
    cy.request('http://localhost:5000/pokemon').then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  it('should return bulbasaur', async () => {
    cy.request('http://localhost:5000/pokemon/1').then((response) => {
      expect(response.body).to.eq({ id: 1, name: 'bulbasaur' });
    });
  });
});
//npm install msw --save-dev
