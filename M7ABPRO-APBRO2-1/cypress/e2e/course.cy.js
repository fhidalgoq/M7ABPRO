
describe('Cursos', () => {
  it('debe crear un curso nuevo', () => {
    cy.login('usuario@example.com', 'Password123!');
    cy.visit('/cursos');
    cy.get('[data-cy=create-course]').click();
    cy.get('[data-cy=course-name]').type('Curso de Prueba');
    cy.get('[data-cy=save-course]').click();
    cy.contains('Curso de Prueba').should('exist');
  });
});