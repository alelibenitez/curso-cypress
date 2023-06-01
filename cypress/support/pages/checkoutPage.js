export class CheckoutPage {

    constructor() {
        
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#lastName';
        this.cardNumberInput = '#cardNumber';
    }

    escribirFirstName(firstname) {
        cy.get(this.firstNameInput).type(firstname);
    };

    escribirLastName(lastname) {
        cy.get(this.lastNameInput).type(lastname);
    };

    escribirCardNumber(cardnumber) {
        cy.get(this.cardNumberInput).type(cardnumber);
    };

    clickPurchase() {
        cy.contains('button', 'Purchase').click();
    };
};