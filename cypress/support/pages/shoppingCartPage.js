export class ShoppingCartPage {

    verificarProducto(producto){
       return cy.get(`[name = '${producto}']`);
    }

    verificarPrecio(precio){
        return cy.get(`[name = '${precio}']`);
    }

    clickShowTotalPrice(){
        cy.contains('button','Show total price').click();
    }

    verficarPrecioTotal(){
        return cy.get('p[id = "price"]');   
    }
};