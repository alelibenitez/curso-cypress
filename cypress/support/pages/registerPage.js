export class RegisterPage {

    clickIniciaSesion(){
        cy.xpath('//span[@id="registertoggle"]').dblclick();
    }
};