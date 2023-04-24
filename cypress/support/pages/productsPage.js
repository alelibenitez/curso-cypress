export class ProductsPage {

    seleccionarProducto(producto){
        cy.contains('p', producto).siblings('button').click();
    }

    closeMessageAlert(){
        cy.get('#closeModal').click();
    }

    goToShoppingCart(){
        cy.get('#goShoppingCart').click();
    }
};