const user = {
  name: 'A',
  username: 'AAA',
  password: 'BBB'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)

    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)

    cy.visit('')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(user)
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Hello')
      cy.get('#author').type('Mike')
      cy.get('#url').type('www.example.com')
      cy.contains('create').click()

      cy.get('.blog').contains('Hello')
    })
  })
})