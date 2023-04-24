export class ShoppingCartPage {

    getShoppingCartProduct(producto){
       return cy.get(`[name = '${producto}']`);
    }
};