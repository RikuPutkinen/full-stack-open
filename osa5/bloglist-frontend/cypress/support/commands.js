Cypress.Commands.add('login', ({ username, name, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/api/login`, {
    username, name, password
  }).then(({ body }) => {
    localStorage.setItem('blogUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/api/blogs`,
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('blogUser')).token}`
    }
  })

  cy.visit('')
})