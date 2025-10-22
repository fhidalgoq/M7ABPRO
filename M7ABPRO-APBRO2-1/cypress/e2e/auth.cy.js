
describe('Autenticación', () => {
  it('debe iniciar sesión con usuario de ejemplo', () => {
    cy.visit('/login');
    cy.get('[data-cy=email]').type('usuario@example.com');
    cy.get('[data-cy=password]').type('Password123!');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/dashboard');
  });
});