describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Aaron Paul',
      username: 'aaronpaul',
      password: 'aaron123',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('aaronpaul')
      cy.get('#password').type('aaron123')
      cy.get('#login-button').click()

      cy.contains('Aaron Paul logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('aaronpaul')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
