/// <reference types="cypress" />
import { RegisterPage } from "../support/pages/registerPage";
import { LoginPage } from "../support/pages/loginPage";
import { HomePage } from "../support/pages/homePage";
import {ProductsPage} from "../support/pages/productsPage";
import {ShoppingCartPage } from "../support/pages/shoppingCartPage";


describe('Pre-entrega', () => {
   let datosFixture
   const registerPage = new RegisterPage();
   const loginPage = new LoginPage();
   const homePage = new HomePage();
   const productPage = new ProductsPage();
   const shoppingCartPage = new ShoppingCartPage();

   before(() => {
        cy.fixture('fixture').then((data) => {
            datosFixture = data
        })       
    })

    beforeEach(() => {
        cy.visit('/');
        registerPage.clickIniciaSesion();
        loginPage.escribirUsuario(datosFixture.user.username);
        loginPage.escribirContraseña(datosFixture.user.password);
        loginPage.clickLogIn();
        homePage.clickonlineShop();
    });

    
    it.only("Elegir 2 productos a elección, añadirlos al carrito, verificar nombre y precio, y verificar precio acumulado", () => {

        productPage.seleccionarProducto(datosFixture.products.prod1.name);    
        productPage.closeMessageAlert();
        productPage.seleccionarProducto(datosFixture.products.prod2.name);
        productPage.closeMessageAlert();
        productPage.goToShoppingCart();
        shoppingCartPage.getShoppingCartProduct(datosFixture.products.prod1.name).should('have.text',datosFixture.products.prod1.name );
        shoppingCartPage.getShoppingCartProduct(datosFixture.products.prod2.name).should('have.text',datosFixture.products.prod2.name );


    });    
});