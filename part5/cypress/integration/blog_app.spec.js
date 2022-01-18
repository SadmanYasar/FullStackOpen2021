describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.get('form')
      .should('contain', 'Username')
      .and('contain', 'Password')
      .and('contain', 'Login')
  })
})
