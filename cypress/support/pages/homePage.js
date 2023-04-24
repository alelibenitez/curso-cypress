export class HomePage {
    constructor() {
        this.onlineShopLink = 'Online Shop';
    }
    clickonlineShop() {
        cy.contains(this.onlineShopLink).click();
    };
};