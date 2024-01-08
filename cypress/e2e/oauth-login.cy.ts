describe('google oauth login', () => {
	it('passes', () => {
		cy.visit("https://localhost:3000")
		cy.request({
			method: 'POST',
			url: 'https://www.googleapis.com/oauth2/v4/token',
			body: {
				grant_type: 'refresh_token',
				client_id: Cypress.env('GOOGLE_CLIENT_ID'),
				client_secret: Cypress.env('GOOGLE_CLIENT_SECRET'),
				refresh_token: Cypress.env('GOOGLE_REFRESH_TOKEN'),
			}
		}).then(({ body }) => {
			const { access_token } = body;
			cy.request({
				method: 'POST',
				url: `${Cypress.env('API_URL')}/auth/google-login`,
				body: {
					accessToken: access_token
				}
			});
		});
		cy.reload();
	});
});