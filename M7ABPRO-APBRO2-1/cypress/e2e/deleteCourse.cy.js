
describe('Eliminar Curso', () => {
  it('debe eliminar un curso existente', () => {
    cy.login('usuario@example.com', 'Password123!');
    cy.visit('/cursos');
    cy.contains('Curso de Prueba')
      .parent()
      .find('[data-cy=delete-course]')
      .click();
    cy.contains('Curso de Prueba').should('not.exist');
  });
});