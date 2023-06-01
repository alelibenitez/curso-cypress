export class ReciptPage {

    verificarNombreApellido(){
        return cy.get('p[id = "name"]', {timeout:10000});
    }
 
    verificarProd1(){
        return cy.get('p[id = "White Pants"]');
    }

    verificarProd2(){
        return cy.get('p[id = "Pink Sweater"]');
    }

    verificarCreditCard(){
        return cy.get('p[id = "creditCard"]');
    }

    verificarTotalPrice(){
        return cy.get('p[id = "totalPrice"]');
    }  
    
    clickThankYou(){
        cy.contains('button', 'Thank you').click();
    }
};