describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'A',
      username: 'AAA',
      password: 'BBB'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('AAA')
      cy.get('#password').type('BBB')
      cy.get('#login-button').click()

      cy.contains('A logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('EEE')
      cy.get('#password').type('FFF')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })
})