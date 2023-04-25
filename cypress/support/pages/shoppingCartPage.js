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
        cy.get("div[class = 'css-1g7ucpo']");   
    }

    /*verficarPrecioTotal(precio1, precio2){
        return precioTotal = precio1 + precio2;
        //return cy.get(`[id = '${precio}']`);    
    }

    verficarPrecioTotal(precio){
        return cy.get(`[id = '${precio}']`);    
    }*/
};