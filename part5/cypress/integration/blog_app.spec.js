describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Carl',
      name: 'Johnson',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form')
      .should('contain', 'Username')
      .and('contain', 'Password')
      .and('contain', 'Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Carl')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('Logged in as Johnson')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Carl')
      cy.get('#password').type('02351')
      cy.get('#login-button').click()
      cy.get('#notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Logged in as Johnson')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Carl', password: '1234' })
    })

    it('A blog can be created', function() {
      cy.contains('Add a blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('http://localhost:3000/')
      cy.get('#blog-button').click()
      cy.get('#notification').contains('Blog testtitle has been added')
      cy.get('.blog')
        .should('contain', 'testtitle')
        .and('contain', 'testauthor')
    })

    it('user can like a blog', function() {
      cy.newBlog({
        title: 'testtitle',
        author: 'testauthor',
        url: 'http://localhost:3000/'
      })

      cy.get('.blog').contains('View').click()
      cy.get('.blog').contains('Like').click()
      cy.get('.blog').should('contain', '1')
    })
  })
})
