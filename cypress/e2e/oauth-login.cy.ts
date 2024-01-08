describe('google oauth login', () => {
	it('passes', () => {
			cy.visit("https://localhost:3000")
			cy.request({
				method: 'POST',
				url: `${Cypress.env('API_ENDPOINT')}/auth/google-login`,
				body: {
					accessToken: `${Cypress.env('GOOGLE_ACCESS_TOKEN')}`
				}
			}).then(({ body }) => {
				cy.reload();
			});
			
		
	})
})