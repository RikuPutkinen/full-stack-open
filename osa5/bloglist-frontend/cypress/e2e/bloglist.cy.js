const user1 = {
  name: 'A',
  username: 'AAA',
  password: 'BBB'
}

const user2 = {
  name: 'B',
  username: 'BBB',
  password: 'BBB'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user2)
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
      cy.login(user1)
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Hello')
      cy.get('#author').type('Mike')
      cy.get('#url').type('www.example.com')
      cy.contains('create').click()

      cy.get('.blog').contains('Hello')
    })

    it('A blog can be liked' , function() {
      cy.createBlog({ title: 'title', author: 'author', url: 'url' })
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be deleted by the user who added it', function() {
      cy.createBlog({ title: 'title', author: 'author', url: 'url' })
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.should('not.contain', 'title')
    })

    it('the remove button is not visible to other users', function() {
      cy.createBlog({ title: 'title', author: 'author', url: 'url' })
      cy.login(user2)
      cy.contains('show').click()
      cy.contains('remove').should('not.exist')
    })

    it('the blog with the most likes is listed first', function() {
      cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
      cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' })

      cy.contains('title1').find('button').click()
      cy.contains('like').click()
      cy.contains('hide').click()

      cy.contains('title2').find('button').click()
      cy.contains('like').click().click()
      cy.contains('hide').click()

      cy.get('.blog').eq(0).contains('title2')
    })
  })
})