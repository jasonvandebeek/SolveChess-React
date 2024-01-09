describe('play move', () => {
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
			}).then(() => {
				cy.reload();
				cy.wait(2000);
				cy.get("#play-button").click();
				cy.get("#create-game-player").click();
				cy.get("#color-white").click();
				cy.get("#friend-0").click();
				cy.get("#create-game").click();
				cy.wait(2000);
				const dataTransfer = new DataTransfer();
				cy.get("#E2 > .piece").trigger('dragstart', {
					dataTransfer
				});

				cy.get("#E4").trigger('drop', {
					dataTransfer
				});
			});
		});
	});
});