/// <reference types="cypress" />
import { ReciptPage } from "../support/pages/reciptPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
import { HomePage } from "../support/pages/homePage";
import {ProductsPage} from "../support/pages/productsPage";
import {ShoppingCartPage } from "../support/pages/shoppingCartPage";

const timeout = 30000;

describe('Entrega Final', () => {
   let datosFixture
   const homePage = new HomePage();
   const productPage = new ProductsPage();
   const shoppingCartPage = new ShoppingCartPage();
   const checkoutPage = new CheckoutPage();
   const reciptPage = new ReciptPage();

   before(() => {
        cy.fixture('datos').then((data)=> {
            datosFixture = data
        })      
    })

    
    it("Elegir 2 productos a elección, añadirlos al carrito, verificar nombre y precio, verificar precio acumulado, completar checkout y verificar los datos en el ticket de compra", () => {
        
        const numero = Math.floor(Math.random() * 1000)
        const bodyRequest = {
            username: `pushingit ${numero}`,
            password: '123456!',
            gender:'Female',
            day:'9',
            month:'Abril',
            year: '1998',        
        }
        cy.request({
            url: 'https://pushing-it.onrender.com/api/register',
            method: 'POST',
            body:bodyRequest
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200)
            
        })

       cy.request({
            url:'https://pushing-it.onrender.com/api/login',
            method: 'POST',
            body:{
                username: bodyRequest.username,
                password: bodyRequest.password
            }
        }).then(respuesta=>{
            expect(respuesta.status).to.be.equal(200)
            window.localStorage.setItem('token', respuesta.body.token);
            window.localStorage.setItem('user', respuesta.body.user.username)
        })

        cy.visit('/');

         
        homePage.clickonlineShop();
        productPage.seleccionarProducto(datosFixture.products.prod1.name);    
        productPage.closeMessageAlert();
        productPage.seleccionarProducto(datosFixture.products.prod2.name);
        productPage.closeMessageAlert();
        productPage.goToShoppingCart();
        shoppingCartPage.verificarProducto(datosFixture.products.prod1.name).should('have.text',datosFixture.products.prod1.name );
        shoppingCartPage.verificarProducto(datosFixture.products.prod2.name).should('have.text',datosFixture.products.prod2.name );
        shoppingCartPage.verificarPrecio(datosFixture.products.prod1.price).should('have.text', '$'+ datosFixture.products.prod1.price);
        shoppingCartPage.verificarPrecio(datosFixture.products.prod2.price).should('have.text', '$'+ datosFixture.products.prod2.price);
        shoppingCartPage.clickShowTotalPrice()
        shoppingCartPage.verficarPrecioTotal().should('have.text',`${datosFixture.products.prod1.price + datosFixture.products.prod2.price}`);
        shoppingCartPage.clickGoToCheckout();
        checkoutPage.escribirFirstName(datosFixture.checkout.nombre);
        checkoutPage.escribirLastName(datosFixture.checkout.apellido);
        checkoutPage.escribirCardNumber(datosFixture.checkout.tarjeta);
        checkoutPage.clickPurchase();
        reciptPage.verificarNombreApellido().should('have.text', datosFixture.checkout.nombre + ' ' + datosFixture.checkout.apellido + ' has succesfully purchased the following items');
        reciptPage.verificarProd1().should('have.text', datosFixture.products.prod1.name);
        reciptPage.verificarProd2().should('have.text', datosFixture.products.prod2.name);
        reciptPage.verificarCreditCard().should('have.text', datosFixture.checkout.tarjeta);
        reciptPage.verificarTotalPrice().should('have.text', 'You have spent $' + `${datosFixture.products.prod1.price + datosFixture.products.prod2.price}`);
        reciptPage.clickThankYou();

         
        cy.request({
            url:`https://pushing-it.onrender.com/api/deleteuser/${bodyRequest.username}`,
            method: 'DELETE'
        }).then(respuesta=>{
            expect(respuesta.status).to.be.equal(200);
        })   
    });   
       
});