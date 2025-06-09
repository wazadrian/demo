describe('Cart Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('should add item to cart', () => {
    cy.get('.card__buy').first().click();
    cy.get('.cart-button').should('contain', '1').click();
    cy.get('.game').should('have.length', 1).and('be.visible');
  });

  it('should remove item from cart', () => {
    cy.get('.card__buy').first().click();
    cy.get('.cart-button').click();
    cy.get('.game').first().realHover();
    cy.get('.remove-button').click();
    cy.get('.game').should('not.exist');
    cy.get('.cart-button').should('contain', '0');
  });

  it('should update item quantity in cart', () => {
    cy.get('.card__buy').first().click();
    cy.get('.cart-button').should('contain', '1');
    cy.get('.card__buy').first().click();
    cy.get('.cart-button').should('contain', '2');
  });

  it('should calculate correct total price', () => {
    // Add first item
    cy.get('.card__buy').first().click();
    // Add second item
    cy.get('.card__buy').eq(1).click();
    cy.get('.cart-button').click();
    cy.get('.cart-container__total').should('exist').and('be.visible');
  });

  it('should persist cart data after page reload', () => {
    cy.get('.card__buy').first().click();
    cy.get('.cart-button').should('contain', '1');
    cy.reload();
    cy.get('.cart-button').should('contain', '1');
  });

  it('should show "In Cart" status for added items', () => {
    cy.get('.card__buy').first().click();
    cy.get('.card__in-cart').should('be.visible').and('contain', 'IN CART');
  });

  it('should clear cart', () => {
    cy.get('.card__buy').first().click();
    cy.get('.cart-button').click();
    cy.get('.cart-container__clear-cart').click();
    cy.get('.game').should('not.exist');
    cy.get('.cart-button').should('contain', '0');
  });

  it('should have proper accessibility attributes', () => {
    cy.get('.card').first().should('have.attr', 'role', 'article');

    cy.get('.cart-button')
      .should('have.attr', 'aria-label', 'Shopping cart')
      .and('have.attr', 'aria-expanded');

    cy.get('.card__buy')
      .first()
      .should('have.attr', 'aria-label')
      .and('include', 'Add')
      .and('include', 'to cart');
  });
});
