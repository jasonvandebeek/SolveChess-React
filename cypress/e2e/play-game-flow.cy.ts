import '../support/commands'

describe('play move', () => {
	it('passes', () => {
		cy.visit(Cypress.env('HOST_URL'));
		cy.loginWithGoogleOauth();
		cy.wait(2000);
		cy.get("#play-button").click();
		cy.get("#create-game-player").click();
		cy.get("#color-white").click();
		cy.get("#friend-0").click();
		cy.get("#create-game").click();
		cy.wait(4000);
		const dataTransfer = new DataTransfer();
		cy.get("#E2 > .piece").trigger('dragstart', {
			dataTransfer
		});

		cy.get("#E4").trigger('drop', {
			dataTransfer
		});

		cy.get("#A1 > .rook.white").should("exist");
		cy.get("#B1 > .knight.white").should("exist");
		cy.get("#C1 > .bishop.white").should("exist");
		cy.get("#D1 > .queen.white").should("exist");
		cy.get("#E1 > .king.white").should("exist");
		cy.get("#F1 > .bishop.white").should("exist");
		cy.get("#G1 > .knight.white").should("exist");
		cy.get("#H1 > .rook.white").should("exist");

		cy.get("#A2 > .pawn.white").should("exist");
		cy.get("#B2 > .pawn.white").should("exist");
		cy.get("#C2 > .pawn.white").should("exist");
		cy.get("#D2 > .pawn.white").should("exist");
		cy.get("#E2 > .pawn.white").should("not.exist");
		cy.get("#F2 > .pawn.white").should("exist");
		cy.get("#G2 > .pawn.white").should("exist");
		cy.get("#H2 > .pawn.white").should("exist");

		cy.get("#E4 > .pawn.white").should("exist");

		cy.get("#A7 > .pawn.black").should("exist");
		cy.get("#B7 > .pawn.black").should("exist");
		cy.get("#C7 > .pawn.black").should("exist");
		cy.get("#D7 > .pawn.black").should("exist");
		cy.get("#E7 > .pawn.black").should("exist");
		cy.get("#F7 > .pawn.black").should("exist");
		cy.get("#G7 > .pawn.black").should("exist");
		cy.get("#H7 > .pawn.black").should("exist");

		cy.get("#A8 > .rook.black").should("exist");
		cy.get("#B8 > .knight.black").should("exist");
		cy.get("#C8 > .bishop.black").should("exist");
		cy.get("#D8 > .queen.black").should("exist");
		cy.get("#E8 > .king.black").should("exist");
		cy.get("#F8 > .bishop.black").should("exist");
		cy.get("#G8 > .knight.black").should("exist");
		cy.get("#H8 > .rook.black").should("exist");
	});
});
